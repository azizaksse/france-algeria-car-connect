import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { brands, fuels, years } from '@/data/vehicles';

const VehicleForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        fuel: 'Essence',
        price: 0,
        image: '',
        images: [] as string[],
        category: 'used',
        mileage: 0,
        available: true,
        transmission: 'Boite Manuelle',
        reference: '',
        bodyType: 'Berline',
        exteriorColor: '',
        status: 'available'
    });

    useEffect(() => {
        if (isEditing) {
            fetchVehicle();
        }
    }, [id]);

    const fetchVehicle = async () => {
        try {
            const { data, error } = await supabase
                .from('vehicles')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    brand: data.brand,
                    model: data.model,
                    year: data.year,
                    fuel: data.fuel,
                    price: data.price,
                    image: data.image,
                    images: data.images || [],
                    category: data.category,
                    mileage: data.mileage,
                    available: data.available,
                    transmission: data.transmission,
                    reference: data.reference,
                    bodyType: data.body_type,
                    exteriorColor: data.exterior_color,
                    status: data.status
                });
            }
        } catch (error) {
            console.error('Error fetching vehicle:', error);
            toast.error('Erreur lors du chargement du véhicule');
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const compressImage = async (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Failed to get canvas context'));
                    return;
                }

                // Max dimensions
                const MAX_WIDTH = 1200;
                const MAX_HEIGHT = 1200;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas to Blob failed'));
                        }
                    },
                    'image/jpeg',
                    0.7 // Quality
                );
            };
            img.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isMain: boolean = false) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const uploadedUrls: string[] = [];

        try {
            for (const file of files) {
                // Compress image
                const compressedBlob = await compressImage(file);
                const compressedFile = new File([compressedBlob], file.name, {
                    type: 'image/jpeg',
                });

                const fileExt = 'jpg';
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('vehicles')
                    .upload(filePath, compressedFile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('vehicles')
                    .getPublicUrl(filePath);

                uploadedUrls.push(publicUrl);
            }

            if (isMain) {
                setFormData(prev => ({ ...prev, image: uploadedUrls[0] }));
            } else {
                setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
            }

            toast.success('Image(s) téléchargée(s)');
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Erreur lors du téléchargement');
        } finally {
            setUploading(false);
        }
    };

    const removeGalleryImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const vehicleData = {
                brand: formData.brand,
                model: formData.model,
                year: formData.year,
                fuel: formData.fuel,
                price: formData.price,
                image: formData.image,
                images: formData.images,
                category: formData.category,
                mileage: formData.mileage,
                available: formData.status === 'available',
                transmission: formData.transmission,
                reference: formData.reference,
                body_type: formData.bodyType,
                exterior_color: formData.exteriorColor,
                status: formData.status
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('vehicles')
                    .update(vehicleData)
                    .eq('id', id);
                if (error) throw error;
                toast.success('Véhicule mis à jour');
            } else {
                const { error } = await supabase
                    .from('vehicles')
                    .insert(vehicleData);
                if (error) throw error;
                toast.success('Véhicule créé');
            }

            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Error saving vehicle:', error);
            toast.error('Erreur lors de l\'enregistrement');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/admin/dashboard">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold text-foreground">
                        {isEditing ? 'Modifier le véhicule' : 'Nouveau véhicule'}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-card p-8 rounded-xl border border-border">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Marque</Label>
                            <Select value={formData.brand} onValueChange={(v) => handleChange('brand', v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner une marque" />
                                </SelectTrigger>
                                <SelectContent>
                                    {brands.map(brand => (
                                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Modèle</Label>
                            <Input
                                value={formData.model}
                                onChange={(e) => handleChange('model', e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Année</Label>
                            <Select value={formData.year.toString()} onValueChange={(v) => handleChange('year', parseInt(v))}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {years.map(year => (
                                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Prix (€)</Label>
                            <Input
                                type="number"
                                value={formData.price}
                                onChange={(e) => handleChange('price', parseFloat(e.target.value))}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Kilométrage</Label>
                            <Input
                                type="number"
                                value={formData.mileage}
                                onChange={(e) => handleChange('mileage', parseInt(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Référence</Label>
                            <Input
                                value={formData.reference}
                                onChange={(e) => handleChange('reference', e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label>Carburant</Label>
                            <Select value={formData.fuel} onValueChange={(v) => handleChange('fuel', v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {fuels.map(fuel => (
                                        <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Transmission</Label>
                            <Select value={formData.transmission} onValueChange={(v) => handleChange('transmission', v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Boite Manuelle">Boite Manuelle</SelectItem>
                                    <SelectItem value="Boite Automatique">Boite Automatique</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">Disponible</SelectItem>
                                    <SelectItem value="arriving">En arrivage</SelectItem>
                                    <SelectItem value="delivered">Livré</SelectItem>
                                    <SelectItem value="sold">Vendu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>Image Principale</Label>
                            <div className="flex items-center gap-4">
                                {formData.image && (
                                    <img src={formData.image} alt="Main" className="w-32 h-24 object-cover rounded-lg border border-border" />
                                )}
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, true)}
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Galerie</Label>
                            <div className="grid grid-cols-4 gap-4 mb-4">
                                {formData.images.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img src={img} alt={`Gallery ${index}`} className="w-full h-24 object-cover rounded-lg border border-border" />
                                        <button
                                            type="button"
                                            onClick={() => removeGalleryImage(index)}
                                            className="absolute top-1 right-1 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <Input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleImageUpload(e, false)}
                                disabled={uploading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button type="button" variant="outline" asChild>
                            <Link to="/admin/dashboard">Annuler</Link>
                        </Button>
                        <Button type="submit" variant="navy" disabled={loading || uploading}>
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;
