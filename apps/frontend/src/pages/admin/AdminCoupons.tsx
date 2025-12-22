import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Ticket,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  Copy,
  Check,
} from 'lucide-react';
import api from '@/lib/api';
import { toast } from 'sonner';

interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minPurchase: number | null;
  maxUses: number | null;
  usedCount: number;
  validFrom: string;
  validUntil: string | null;
  isActive: boolean;
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    minPurchase: '',
    maxUses: '',
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: '',
    isActive: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await api.get('/coupons');
      setCoupons(response.data.data || response.data || []);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      // Se a rota não existir, usar dados mockados
      setCoupons([
        {
          id: '1',
          code: 'PRIMEIRA10',
          type: 'percentage',
          value: 10,
          minPurchase: 100,
          maxUses: null,
          usedCount: 45,
          validFrom: '2024-01-01',
          validUntil: '2025-12-31',
          isActive: true,
        },
        {
          id: '2',
          code: 'FRETE50',
          type: 'fixed',
          value: 50,
          minPurchase: 299,
          maxUses: 100,
          usedCount: 23,
          validFrom: '2024-06-01',
          validUntil: '2024-12-31',
          isActive: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, code });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      ...formData,
      minPurchase: formData.minPurchase ? parseFloat(formData.minPurchase) : null,
      maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
      validUntil: formData.validUntil || null,
    };

    try {
      if (editingCoupon) {
        await api.put(`/coupons/${editingCoupon.id}`, payload);
        toast.success('Cupom atualizado com sucesso');
      } else {
        await api.post('/coupons', payload);
        toast.success('Cupom criado com sucesso');
      }
      
      setDialogOpen(false);
      setEditingCoupon(null);
      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error('Error saving coupon:', error);
      toast.error('Erro ao salvar cupom');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      type: 'percentage',
      value: 0,
      minPurchase: '',
      maxUses: '',
      validFrom: new Date().toISOString().split('T')[0],
      validUntil: '',
      isActive: true,
    });
  };

  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minPurchase: coupon.minPurchase?.toString() || '',
      maxUses: coupon.maxUses?.toString() || '',
      validFrom: coupon.validFrom.split('T')[0],
      validUntil: coupon.validUntil?.split('T')[0] || '',
      isActive: coupon.isActive,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/coupons/${id}`);
      setCoupons(coupons.filter((c) => c.id !== id));
      toast.success('Cupom excluído com sucesso');
    } catch (error) {
      console.error('Error deleting coupon:', error);
      toast.error('Erro ao excluir cupom');
    }
  };

  const handleNewCoupon = () => {
    setEditingCoupon(null);
    resetForm();
    setDialogOpen(true);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success('Código copiado!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const isExpired = (validUntil: string | null) => {
    if (!validUntil) return false;
    return new Date(validUntil) < new Date();
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Cupons</h1>
                <p className="text-gray-600 mt-1">Gerencie os cupons de desconto</p>
              </div>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2" onClick={handleNewCoupon}>
                  <Plus className="h-4 w-4" />
                  Novo Cupom
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>
                      {editingCoupon ? 'Editar Cupom' : 'Novo Cupom'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingCoupon
                        ? 'Atualize as informações do cupom'
                        : 'Preencha os dados para criar um novo cupom'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="code">Código do Cupom</Label>
                      <div className="flex gap-2">
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) =>
                            setFormData({ ...formData, code: e.target.value.toUpperCase() })
                          }
                          placeholder="Ex: DESCONTO10"
                          required
                          className="uppercase"
                        />
                        <Button type="button" variant="outline" onClick={generateCode}>
                          Gerar
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="type">Tipo</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: 'percentage' | 'fixed') =>
                            setFormData({ ...formData, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                            <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="value">Valor</Label>
                        <Input
                          id="value"
                          type="number"
                          value={formData.value}
                          onChange={(e) =>
                            setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })
                          }
                          min={0}
                          max={formData.type === 'percentage' ? 100 : undefined}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="minPurchase">Compra Mínima (R$)</Label>
                        <Input
                          id="minPurchase"
                          type="number"
                          value={formData.minPurchase}
                          onChange={(e) =>
                            setFormData({ ...formData, minPurchase: e.target.value })
                          }
                          placeholder="Opcional"
                          min={0}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="maxUses">Máximo de Usos</Label>
                        <Input
                          id="maxUses"
                          type="number"
                          value={formData.maxUses}
                          onChange={(e) =>
                            setFormData({ ...formData, maxUses: e.target.value })
                          }
                          placeholder="Ilimitado"
                          min={1}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="validFrom">Válido a partir de</Label>
                        <Input
                          id="validFrom"
                          type="date"
                          value={formData.validFrom}
                          onChange={(e) =>
                            setFormData({ ...formData, validFrom: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="validUntil">Válido até</Label>
                        <Input
                          id="validUntil"
                          type="date"
                          value={formData.validUntil}
                          onChange={(e) =>
                            setFormData({ ...formData, validUntil: e.target.value })
                          }
                          placeholder="Sem limite"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="isActive">Cupom Ativo</Label>
                      <Switch
                        id="isActive"
                        checked={formData.isActive}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, isActive: checked })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="gap-2">
                      <Save className="h-4 w-4" />
                      Salvar
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Coupons Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Lista de Cupons ({coupons.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {coupons.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Nenhum cupom encontrado</p>
                <Button className="mt-4" onClick={handleNewCoupon}>
                  Criar Primeiro Cupom
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Desconto</TableHead>
                    <TableHead>Compra Mín.</TableHead>
                    <TableHead>Usos</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="font-bold bg-gray-100 px-2 py-1 rounded">
                            {coupon.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyCode(coupon.code)}
                          >
                            {copiedCode === coupon.code ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {coupon.type === 'percentage'
                            ? `${coupon.value}%`
                            : `R$ ${coupon.value.toFixed(2)}`}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {coupon.minPurchase ? `R$ ${coupon.minPurchase.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell>
                        {coupon.usedCount}
                        {coupon.maxUses && ` / ${coupon.maxUses}`}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>De: {new Date(coupon.validFrom).toLocaleDateString('pt-BR')}</p>
                          {coupon.validUntil && (
                            <p>Até: {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {!coupon.isActive ? (
                            <Badge variant="secondary">Inativo</Badge>
                          ) : isExpired(coupon.validUntil) ? (
                            <Badge variant="destructive">Expirado</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(coupon)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Excluir Cupom</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o cupom "{coupon.code}"? Esta
                                  ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(coupon.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
