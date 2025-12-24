import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Vehicle } from '@/data/vehicles';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, LogOut, Search, Car, Euro, CheckCircle, XCircle, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    useEffect(() => {
        checkUser();
        fetchVehicles();
    }, []);

    const checkUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/admin/login');
        }
    };

    const fetchVehicles = async () => {
        try {
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                const mappedVehicles: Vehicle[] = data.map(v => ({
                    id: v.id,
                    brand: v.brand,
                    model: v.model,
                    year: v.year,
                    fuel: v.fuel,
                    price: v.price,
                    image: v.image,
                    category: v.category,
                    mileage: v.mileage,
                    available: v.available,
                    transmission: v.transmission,
                    reference: v.reference,
                    bodyType: v.body_type,
                    exteriorColor: v.exterior_color,
                    status: v.status
                }));
                setVehicles(mappedVehicles);
            }
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            toast.error('Erreur lors du chargement des véhicules');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    const handleDelete = async (id: string) => {
        try {
            const { error } = await supabase
                .from('vehicles')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setVehicles(vehicles.filter(v => v.id !== id));
            toast.success('Véhicule supprimé');
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            toast.error('Erreur lors de la suppression');
        }
    };

    const handleDeleteAll = async () => {
        if (!window.confirm('Êtes-vous sûr de vouloir tout supprimer ? Cette action est irréversible.')) return;

        try {
            setLoading(true);
            const { error } = await supabase
                .from('vehicles')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000');

            if (error) throw error;

            setVehicles([]);
            toast.success('Tous les véhicules ont été supprimés');
        } catch (error) {
            console.error('Error deleting all vehicles:', error);
            toast.error('Erreur lors de la suppression de tous les véhicules');
        } finally {
            setLoading(false);
        }
    };

    const filteredVehicles = vehicles.filter(v => {
        const matchesSearch =
            v.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.reference.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
        const matchesCategory = categoryFilter === 'all' || v.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Statistics
    const totalVehicles = vehicles.length;
    const totalValue = vehicles.reduce((sum, v) => sum + (v.price || 0), 0);
    const availableVehicles = vehicles.filter(v => v.status === 'available').length;
    const soldVehicles = vehicles.filter(v => v.status === 'sold').length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
                        <p className="text-muted-foreground">Vue d'ensemble de votre inventaire</p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="destructive" onClick={handleDeleteAll}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Tout supprimer
                        </Button>
                        <Button variant="outline" onClick={handleLogout}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Déconnexion
                        </Button>
                        <Button asChild className="bg-primary hover:bg-primary/90">
                            <Link to="/admin/vehicles/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un véhicule
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Véhicules</CardTitle>
                            <Car className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalVehicles}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Valeur Totale</CardTitle>
                            <Euro className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalValue.toLocaleString()} €</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{availableVehicles}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Vendus</CardTitle>
                            <XCircle className="h-4 w-4 text-red-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">{soldVehicles}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par marque, modèle ou référence..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-none bg-secondary/50 focus-visible:ring-0 focus-visible:bg-background transition-colors"
                        />
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <SelectValue placeholder="Status" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les status</SelectItem>
                                <SelectItem value="available">Disponible</SelectItem>
                                <SelectItem value="arriving">En arrivage</SelectItem>
                                <SelectItem value="sold">Vendu</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full md:w-48">
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger>
                                <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4" />
                                    <SelectValue placeholder="Catégorie" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Toutes catégories</SelectItem>
                                <SelectItem value="new">Neuf</SelectItem>
                                <SelectItem value="used">Occasion</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                                <TableHead className="w-[100px]">Image</TableHead>
                                <TableHead>Véhicule</TableHead>
                                <TableHead>Prix</TableHead>
                                <TableHead>Catégorie</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Référence</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredVehicles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        Aucun véhicule trouvé
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredVehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id} className="hover:bg-secondary/20 transition-colors">
                                        <TableCell>
                                            <div className="relative w-16 h-12 rounded-md overflow-hidden bg-secondary">
                                                {vehicle.image ? (
                                                    <img
                                                        src={vehicle.image}
                                                        alt={vehicle.model}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                        No img
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-semibold text-foreground">{vehicle.brand} {vehicle.model}</div>
                                            <div className="text-sm text-muted-foreground">{vehicle.year} • {vehicle.fuel} • {vehicle.mileage?.toLocaleString()} km</div>
                                        </TableCell>
                                        <TableCell className="font-medium">{vehicle.price.toLocaleString()} €</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${vehicle.category === 'new'
                                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                                : 'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}>
                                                {vehicle.category === 'new' ? 'Neuf' : 'Occasion'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${vehicle.status === 'available'
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : vehicle.status === 'sold'
                                                    ? 'bg-red-50 text-red-700 border-red-200'
                                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                                }`}>
                                                {vehicle.status === 'available' ? 'Disponible' :
                                                    vehicle.status === 'sold' ? 'Vendu' :
                                                        vehicle.status === 'arriving' ? 'En arrivage' : vehicle.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{vehicle.reference}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10 hover:text-primary">
                                                    <Link to={`/admin/vehicles/edit/${vehicle.id}`}>
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Cette action est irréversible. Cela supprimera définitivement le véhicule de la base de données.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(vehicle.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                                                Supprimer
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
