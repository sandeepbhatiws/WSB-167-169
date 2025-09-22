import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import axios from 'axios'
import { toast } from 'react-toastify'
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic-light-dark.css';

const sortOptions = [
    { name: 'Name : A to Z', value: '1', current: false },
    { name: 'Name : Z to A', value: '2', current: false },
    { name: 'Price: Low to High', value: '3', current: false },
    { name: 'Price: High to Low', value: '4', current: false },
    { name: 'Discounted Price: Low to High', value: '5', current: false },
    { name: 'Discounted Price: High to Low', value: '6', current: false },
]

const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'category',
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductLisitng() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
        .then((result) => {
            setCategories(result.data.data);
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
    },[]);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/brands.php')
        .then((result) => {
            setBrands(result.data.data);
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
    },[]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sorting, setSorting] = useState('');
    const [filterCategories, setFilterCategories] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [rating, setRating] = useState('');
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php',{
            params : {
                page : currentPage,
                limit : 21,
                sorting : sorting,
                price_from : '',
                price_to : '',
                discount_from : '',
                discount_to : '',
                name : searchName,
                rating : rating,
                brands : filterBrands.toString(),
                categories : filterCategories.toString(),
            }
        })
        .then((result) => {
            setProducts(result.data.data);
            setTotalPages(result.data.total_pages);
        })
        .catch(() => {
            toast.error('Something went wrong');
        })
    },[currentPage, sorting, filterBrands, filterCategories, rating, searchName]);

    const filterCategory = (slug) => {
        if (filterCategories.includes(slug)) {
            var data = filterCategories.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterCategories([...data]);

        } else {
            var data = [...filterCategories, slug];
            setFilterCategories(data);
        }
        setCurrentPage(1);
    }

    const filterBrand = (slug) => {
        if (filterBrands.includes(slug)) {
            var data = filterBrands.filter((v) => {
                if (v != slug) {
                    return v;
                }
            })

            setFilterBrands([...data]);

        } else {
            var data = [...filterBrands, slug];
            setFilterBrands(data);
        }
        setCurrentPage(1);
    }
    const filterSorting = (value) => {
        setSorting(value);
        setCurrentPage(1);
    }

    const filterRating = (rate) => {
        setRating(rate);
        setCurrentPage(1);
    }

    const getInputValue = (event) => {
        setSearchName(event.target.value);
        setCurrentPage(1);
    }

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">


                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                    <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex gap-3">
                                                        <div className="flex h-5 shrink-0 items-center">
                                                            <div className="group grid size-4 grid-cols-1">
                                                                <input
                                                                    defaultValue={option.value}
                                                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                    name={`${section.id}[]`}
                                                                    type="checkbox"
                                                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                                />
                                                                <svg
                                                                    fill="none"
                                                                    viewBox="0 0 14 14"
                                                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                                >
                                                                    <path
                                                                        d="M3 8L6 11L11 3.5"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-checked:opacity-100"
                                                                    />
                                                                    <path
                                                                        d="M3 7H11"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        className="opacity-0 group-has-indeterminate:opacity-100"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                    Sort
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                    />
                                </MenuButton>

                                <input onKeyUp={ getInputValue }/>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name} onClick={ () => filterSorting(option.value) } >
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="size-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                
                                {/* Categories Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Categories</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            {categories.map((option, optionId) => (
                                                <div key={optionId} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                id={option.slug}
                                                                type="checkbox"
                                                                onClick={() => filterCategory(option.slug)}
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <label htmlFor={option.slug} className="text-sm text-gray-600">
                                                        {option.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>

                                {/* Brands Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Brands</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            {brands.map((option, optionId) => (
                                                option.name ?
                                                <div key={optionId} className="flex gap-3">
                                                    <div className="flex h-5 shrink-0 items-center">
                                                        <div className="group grid size-4 grid-cols-1">
                                                            <input
                                                                id={option.slug}
                                                                type="checkbox"
                                                                onClick={() => filterBrand(option.slug)}
                                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                            />
                                                            <svg
                                                                fill="none"
                                                                viewBox="0 0 14 14"
                                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                                            >
                                                                <path
                                                                    d="M3 8L6 11L11 3.5"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-checked:opacity-100"
                                                                />
                                                                <path
                                                                    d="M3 7H11"
                                                                    strokeWidth={2}
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <label htmlFor={option.slug} className="text-sm text-gray-600">
                                                        {option.name}
                                                    </label>
                                                </div>
                                                : ''
                                            ))}
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>

                                {/* Price Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Price</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="0-500" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label 
                                                for="0-500" 
                                                class="block text-sm/6 font-medium text-gray-900">
                                                    Rs.0 - Rs.500
                                                </label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="501-1000" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="501-1000" class="block text-sm/6 font-medium text-gray-900">
                                                Rs.501 - Rs.1000</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="1001-1500" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="1001-1500" class="block text-sm/6 font-medium text-gray-900">
                                                Rs.1001 - Rs.1500</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="1501-2500" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="1501-2500" class="block text-sm/6 font-medium text-gray-900">
                                                Rs.1501 - Rs.2500</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="2501-more" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="2501-more" class="block text-sm/6 font-medium text-gray-900">
                                                Rs.2501 and more</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>

                                {/* Discounted Price Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Discounted Price</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="0-20" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label 
                                                for="0-20" 
                                                class="block text-sm/6 font-medium text-gray-900">
                                                    0% - 20%
                                                </label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="21-40" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="21-40" class="block text-sm/6 font-medium text-gray-900">
                                                21% - 40%</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="41-60" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="41-60" class="block text-sm/6 font-medium text-gray-900">
                                                41% -60%</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="61-80" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="61-80" class="block text-sm/6 font-medium text-gray-900">
                                                61% - 80%</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="81-100" 
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="81-100" class="block text-sm/6 font-medium text-gray-900">
                                                81% - 100%</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>


                                {/* Rating Filter */}
                                <Disclosure as="div" className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Rating</span>
                                            <span className="ml-6 flex items-center">
                                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                                            </span>
                                        </DisclosureButton>
                                    </h3>
                                    <DisclosurePanel className="pt-6">
                                        <div className="space-y-4">
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="1" 
                                                onClick={ () => filterRating(1) }
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label 
                                                for="1" 
                                                class="block text-sm/6 font-medium text-gray-900">
                                                    1 and more
                                                </label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="2" 
                                                onClick={ () => filterRating(2) }
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="2" class="block text-sm/6 font-medium text-gray-900">
                                                2 and more</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="3" 
                                                onClick={ () => filterRating(3) }
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="3" class="block text-sm/6 font-medium text-gray-900">
                                                3 and more</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="4" 
                                                onClick={ () => filterRating(4) }
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="4" class="block text-sm/6 font-medium text-gray-900">
                                                4 and more</label>
                                            </div>
                                            <div class="flex items-center gap-x-3">
                                                <input 
                                                id="5" 
                                                onClick={ () => filterRating(5) }
                                                type="radio" 
                                                name="push-notifications"
                                                class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden" />
                                                <label for="5" class="block text-sm/6 font-medium text-gray-900">
                                                5 and more</label>
                                            </div>
                                        </div>
                                    </DisclosurePanel>
                                </Disclosure>



                                
                            </form>

                            {/* Product grid */}
                            <div className="lg:col-span-3">
                                <section class="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-5">
                                    {
                                        products.map((item,index) => {
                                            return(
                                                <ProductCard key={index} data={item} />
                                            )   
                                        })
                                    }
                                    
                                </section>
                                <ResponsivePagination
                            current={currentPage}
                            total={totalPages}
                            onPageChange={setCurrentPage}
                            />
                            </div>
                            
                        </div>
                        
                    </section>
                </main>
            </div>
        </div>
    )
}
