"use client"
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CardProducts } from '@/components/card-product';
import { FaWhatsapp } from 'react-icons/fa';
import { HiArrowLeft, HiCheckCircle } from 'react-icons/hi2';
import {
    Package,
    FileText,
    CheckCircle2,
    Info,
    Layers,
    Zap,
    Tag,
    Shield
} from 'lucide-react';
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic';

// Skeleton Loading
const ProductDetailSkeleton = () => (
    <div className="margin spacing animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-6"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-main"></div>
            <div className="space-y-4">
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
            </div>
        </div>
    </div>
);

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const { slug } = params;

    const [product, setProduct] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/products/detail/${slug}`);

                if (!response.ok) {
                    throw new Error('Product not found');
                }

                const result = await response.json();

                if (result.success && result.data) {
                    setProduct(result.data);
                    setSuggestions(result.suggestions || []);
                    setSelectedImage(result.data.imageUrl);
                } else {
                    throw new Error('Invalid product data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    // Loading state
    if (loading) {
        return <ProductDetailSkeleton />;
    }

    // Error state
    if (error || !product) {
        return (
            <div className="margin spacing">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
                    <p className="text-red-600 dark:text-red-400 mb-4">
                        {error || 'Product not found'}
                    </p>
                    <Link href="/product">
                        <Button>
                            <HiArrowLeft className="mr-2" />
                            Back to Products
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // Get all images
    const allImages = product.images && product.images.length > 0
        ? [product.imageUrl, ...product.images.map(img => img.imageUrl)]
        : [product.imageUrl];

    // Tabs configuration based on available data
    const tabs = [
        { id: 'overview', label: 'Overview', icon: Package },
        product.content && { id: 'features', label: 'Features', icon: Zap },
        product.spec && { id: 'spec', label: 'Specifications', icon: FileText },
        product.tables && product.tables.length > 0 && { id: 'tables', label: 'Technical Data', icon: Layers },
    ].filter(Boolean);

    // WhatsApp contact
    const handleWhatsAppContact = () => {
        const message = `Halo, saya tertarik dengan produk ${product.productName}`;
        const whatsappLink = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    return (
        <>
            <div className="margin spacing">
                {/* Breadcrumb */}
                <BreadcrumbDynamic className='mb-3' />

                {/* Main Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="w-full aspect-square rounded-main overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative group">
                            <Image
                                src={selectedImage || product.imageUrl}
                                alt={product.productName}
                                width={800}
                                height={800}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                            {product.isPriority && (
                                <div className="absolute top-4 left-4">
                                    <span className="bg-mainColor dark:bg-secondaryColor text-white px-3 py-1 rounded-full text-xs font-semibold">
                                        Priority Product
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {allImages.length > 1 && (
                            <div className="carousel w-full gap-2 rounded-third">
                                {allImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`min-w-30 aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-maincbg-mainColor dark:hover:border-secbg-secondaryColor ${selectedImage === img
                                            ? 'border-maincbg-mainColor dark:border-secbg-secondaryColor'
                                            : 'border-neutral-200 dark:border-neutral-700'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.productName} - ${idx + 1}`}
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Title & Division */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 bg-mainColor/10 dark:bg-secondaryColor/10 text-maincbg-mainColor dark:text-secbg-secondaryColor rounded-full text-sm font-medium">
                                    {product.division}
                                </span>
                                {product.productCategory && product.productCategory !== '-' && (
                                    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm">
                                        {product.productCategory}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {product.productName}
                            </h1>
                            {product.content?.tagline && product.content.tagline !== product.productName && (
                                <p className="text-lg text-muted-foreground">
                                    {product.content.tagline}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-base leading-relaxed">
                                {product.descriptions}
                            </p>
                        </div>

                        {/* Highlights */}
                        {product.content?.highlights && product.content.highlights.length > 0 && (
                            <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-4">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-maincbg-mainColor dark:text-secbg-secondaryColor" />
                                    Key Highlights
                                </h3>
                                <ul className="space-y-2">
                                    {product.content.highlights.map((highlight, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <HiCheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span>{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Selling Points */}
                        {product.content?.sellingPoints && product.content.sellingPoints.length > 0 && (
                            <div className="border-l-4 border-maincbg-mainColor dark:border-secbg-secondaryColor pl-4">
                                <h3 className="font-semibold mb-2 flex items-center gap-2">
                                    <Tag className="h-5 w-5" />
                                    Product Strength
                                </h3>
                                <ul className="space-y-1">
                                    {product.content.sellingPoints.map((point, idx) => (
                                        <li key={idx} className="text-sm text-muted-foreground">
                                            • {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="flex md:flex-row flex-col gap-3 pt-4">
                            <Button
                                size="lg"
                                onClick={handleWhatsAppContact}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            >
                                <FaWhatsapp className="mr-2 h-5 w-5" />
                                Contact via WhatsApp
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => router.push('/product')}
                                className="flex-1"
                            >
                                Browse More Products
                            </Button>
                        </div>

                        {/* Notes */}
                        {product.content?.notes && product.content.notes !== '-' && (
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-blue-900 dark:text-blue-100">
                                        {product.content.notes}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="mb-10">
                    {/* Tab Navigation */}
                    <div className="flex gap-2 border-b mb-6 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-maincbg-mainColor dark:border-secbg-secondaryColor text-maincbg-mainColor dark:text-secbg-secondaryColor font-medium'
                                        : 'border-transparent text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white dark:bg-darkColor rounded-lg border p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Product Overview</h2>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {product.descriptions}
                                    </p>
                                </div>

                                {product.keywords && product.keywords.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-3">Keywords</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {product.keywords[0].split(';').map((keyword, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm"
                                                >
                                                    {keyword.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Features Tab */}
                        {activeTab === 'features' && product.content && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Product Features</h2>
                                </div>

                                {product.content.highlights && product.content.highlights.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <Zap className="h-5 w-5 text-maincbg-mainColor dark:text-secbg-secondaryColor" />
                                            Key Features
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {product.content.highlights.map((highlight, idx) => (
                                                <div key={idx} className="flex items-start gap-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-sm">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {product.content.sellingPoints && product.content.sellingPoints.length > 0 && (
                                    <div>
                                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                                            <Tag className="h-5 w-5" />
                                            Product Strength
                                        </h3>
                                        <ul className="space-y-2">
                                            {product.content.sellingPoints.map((point, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <span className="text-maincbg-mainColor dark:text-secbg-secondaryColor font-bold">•</span>
                                                    <span className="text-sm">{point}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Specifications Tab */}
                        {activeTab === 'spec' && product.spec && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Technical Specifications</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    {product.spec.specification && product.spec.specification !== '–' && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Specification</div>
                                            <div className="font-medium">{product.spec.specification}</div>
                                        </div>
                                    )}

                                    {product.spec.function && product.spec.function !== '–' && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Function</div>
                                            <div className="font-medium">{product.spec.function}</div>
                                        </div>
                                    )}

                                    {product.spec.strength && product.spec.strength !== '–' && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Strength</div>
                                            <div className="font-medium">{product.spec.strength}</div>
                                        </div>
                                    )}

                                    {product.spec.capacity && product.spec.capacity !== '–' && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Capacity</div>
                                            <div className="font-medium">{product.spec.capacity}</div>
                                        </div>
                                    )}

                                    {product.spec.power && product.spec.power !== '–' && product.spec.power !== '' && (
                                        <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
                                            <div className="text-sm text-muted-foreground mb-1">Power</div>
                                            <div className="font-medium">{product.spec.power}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tables Tab */}
                        {activeTab === 'tables' && product.tables && product.tables.length > 0 && (
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-4">Technical Data</h2>
                                </div>

                                {product.tables.map((table, idx) => (
                                    <div key={idx} className="space-y-3">
                                        <h3 className="font-semibold text-lg">{table.tableName}</h3>
                                        <div className="overflow-x-auto">
                                            <table className="w-full border border-neutral-200 dark:border-neutral-700 rounded-lg">
                                                {table.tableHead && table.tableHead.length > 0 && (
                                                    <thead className="bg-neutral-100 dark:bg-neutral-800">
                                                        <tr>
                                                            {table.tableHead.map((head, headIdx) => (
                                                                <th
                                                                    key={headIdx}
                                                                    className="px-4 py-3 text-left text-sm font-semibold border-b border-neutral-200 dark:border-neutral-700"
                                                                >
                                                                    {head}
                                                                </th>
                                                            ))}
                                                        </tr>
                                                    </thead>
                                                )}
                                                <tbody>
                                                    {table.rows.map((row, rowIdx) => (
                                                        <tr
                                                            key={rowIdx}
                                                            className="border-b border-neutral-200 dark:border-neutral-700 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                                                        >
                                                            {row.filter(cell => cell !== '–').map((cell, cellIdx) => (
                                                                <td key={cellIdx} className="px-4 py-3 text-sm">
                                                                    {cell}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Variants Section - Using CardProducts */}
                {product.variants && product.variants.length > 0 && (
                    <CardProducts
                        products={product.variants}
                        loading={false}
                        title="Product Variants"
                        mode="grid"
                        showTitle={true}
                        showArrows={false}
                        showDesc={true}
                        gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                        useMargin={false}
                        verticalMargin="mb-10"
                    />
                )}

            </div>
            {/* Suggestions Section - Using CardProducts */}
            {suggestions && suggestions.length > 0 && (
                <CardProducts
                    products={suggestions}
                    loading={false}
                    title="You May Also Like"
                    viewAllLink="/product"
                    mode="carousel"
                    showTitle={true}
                    showArrows={true}
                    showDesc={true}
                    gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    useMargin={true}
                    verticalMargin="mb-10"
                />
            )}
        </>

    );
}