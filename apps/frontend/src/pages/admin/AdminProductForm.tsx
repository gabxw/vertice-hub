import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Plus, Trash2, Save, Package } from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Variant {
  id?: string;
  size: string;
  colorName: string;
  colorHex: string;
  stock: number;
  sku?: string;
}

interface ProductForm {
  name: string;
  slug: string;
  description: string;
  story: string;
  price: string;
  originalPrice: string;
  categoryId: string;
  isActive: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  images: string[];
  variants: Variant[];
  tags: string[];
}

const defaultVariant: Variant = {
  size: '',
  colorName: '',
  colorHex: '#000000',
  stock: 0,
};

const defaultForm: ProductForm = {
  name: '',
  slug: '',
  description: '',
  story: '',
  price: '',
  originalPrice: '',
  categoryId: '',
  isActive: true,
  isNew: false,
  isBestSeller: false,
  images: [''],
  variants: [{ ...defaultVariant }],
  tags: [],
};

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [form, setForm] = useState<ProductForm>(defaultForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/products/by-id/${id}`);
      const product = response.data.data;
      
      setForm({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        story: product.story || '',
        price: String(product.price),
        originalPrice: product.originalPrice ? String(product.originalPrice) : '',
        categoryId: product.categoryId,
        isActive: product.isActive,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller,
        images: product.images?.map((img: any) => img.url) || [''],
        variants: product.variants?.map((v: any) => ({
          id: v.id,
          size: v.size,
          colorName: v.colorName,
          colorHex: v.colorHex,
          stock: v.stock,
          sku: v.sku,
        })) || [{ ...defaultVariant }],
        tags: product.tags?.map((t: any) => t.name) || [],
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Erro ao carregar produto');
      navigate('/admin/produtos');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: !isEditing ? generateSlug(name) : prev.slug,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const removeImage = (index: number) => {
    if (form.images.length > 1) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, images: newImages }));
    }
  };

  const handleVariantChange = (index: number, field: keyof Variant, value: string | number) => {
    const newVariants = [...form.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setForm((prev) => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...defaultVariant }],
    }));
  };

  const removeVariant = (index: number) => {
    if (form.variants.length > 1) {
      const newVariants = form.variants.filter((_, i) => i !== index);
      setForm((prev) => ({ ...prev, variants: newVariants }));
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description,
        story: form.story,
        price: parseFloat(form.price),
        originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
        categoryId: form.categoryId,
        isActive: form.isActive,
        isNew: form.isNew,
        isBestSeller: form.isBestSeller,
        images: form.images.filter((img) => img.trim()),
        variants: form.variants.filter((v) => v.size && v.colorName),
        tags: form.tags,
      };

      if (isEditing) {
        await api.put(`/products/${id}`, payload);
        toast.success('Produto atualizado com sucesso');
      } else {
        await api.post('/products', payload);
        toast.success('Produto criado com sucesso');
      }

      navigate('/admin/produtos');
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast.error(error.response?.data?.message || 'Erro ao salvar produto');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/admin/produtos">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Editar Produto' : 'Novo Produto'}
              </h1>
              <p className="text-gray-600 mt-1">
                {isEditing ? 'Atualize as informações do produto' : 'Cadastre um novo produto na loja'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="name">Nome do Produto *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={form.slug}
                      onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="nome-do-produto"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="story">História do Produto</Label>
                    <Textarea
                      id="story"
                      value={form.story}
                      onChange={(e) => setForm((prev) => ({ ...prev, story: e.target.value }))}
                      rows={2}
                      placeholder="Conte a história por trás deste produto..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Preços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço de Venda (R$) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      min="0"
                      value={form.originalPrice}
                      onChange={(e) => setForm((prev) => ({ ...prev, originalPrice: e.target.value }))}
                      placeholder="Deixe vazio se não houver desconto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Imagens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="URL da imagem"
                    />
                    {form.images.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeImage(index)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addImage} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Imagem
                </Button>
              </CardContent>
            </Card>

            {/* Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Variantes (Tamanhos e Cores)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {form.variants.map((variant, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Variante {index + 1}</span>
                      {form.variants.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariant(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Tamanho</Label>
                        <Input
                          value={variant.size}
                          onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
                          placeholder="P, M, G, 40, 41..."
                        />
                      </div>
                      <div>
                        <Label>Nome da Cor</Label>
                        <Input
                          value={variant.colorName}
                          onChange={(e) => handleVariantChange(index, 'colorName', e.target.value)}
                          placeholder="Preto, Branco..."
                        />
                      </div>
                      <div>
                        <Label>Cor (Hex)</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={variant.colorHex}
                            onChange={(e) => handleVariantChange(index, 'colorHex', e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input
                            value={variant.colorHex}
                            onChange={(e) => handleVariantChange(index, 'colorHex', e.target.value)}
                            placeholder="#000000"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Estoque</Label>
                        <Input
                          type="number"
                          min="0"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, 'stock', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={addVariant} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Adicionar Variante
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardContent className="p-6">
                <Button type="submit" className="w-full gap-2" disabled={saving}>
                  <Save className="h-4 w-4" />
                  {saving ? 'Salvando...' : isEditing ? 'Atualizar Produto' : 'Criar Produto'}
                </Button>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={form.categoryId}
                  onValueChange={(value) => setForm((prev) => ({ ...prev, categoryId: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Produto Ativo</Label>
                  <Switch
                    id="isActive"
                    checked={form.isActive}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isActive: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isNew">Marcar como Novo</Label>
                  <Switch
                    id="isNew"
                    checked={form.isNew}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isNew: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isBestSeller">Destaque (Best Seller)</Label>
                  <Switch
                    id="isBestSeller"
                    checked={form.isBestSeller}
                    onCheckedChange={(checked) => setForm((prev) => ({ ...prev, isBestSeller: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Adicionar tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
