import React, { useEffect, useState } from 'react'
import Header from './Header'
import axios from 'axios';
import { toast } from 'react-toastify';
import Product from './Product';

export default function ProductListing() {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [sorting, setSorting] = useState('');

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/categories.php')
            .then((result) => {
                setCategories(result.data.data)
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, []);

    useEffect(() => {
        axios.get('https://wscubetech.co/ecommerce-api/products.php', {
            params: {
                page: 1,
                limit: 12,
                categories: filterCategories.toString(),
                price_from: priceFrom,
                price_to: priceTo,
                sorting : sorting
            }
        })
            .then((result) => {
                setProducts(result.data.data)
            })
            .catch(() => {
                toast.error('Something went wrong !')
            })
    }, [filterCategories, priceFrom, sorting]);

    const filterCategry = (slug) => {

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
    }

    const priceFilter = (from, to) => {
        setPriceFrom(from)
        setPriceTo(to)
    }

    const filterSorting = (value) => {
        setSorting(value);
    }

    return (
        <>
            <Header />

            <div className='container-fluid'>
                <div className='container'>
                    <div className='row'>
                        <div class="overlay d-none" ></div>
                        <div class="search-section">
                            <div class="container-fluid container-xl">
                                <div class="row main-content ml-md-0">
                                    <div class="sidebar col-md-3 px-0">
                                        <h1 class="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                                            <span class="mr-2 filter-close-btn">
                                                X
                                            </span>
                                            Filters
                                            <span class="ml-auto text-uppercase">Reset Filters</span>
                                        </h1>
                                        <div class="sidebar__inner ">
                                            <div class="filter-body">
                                                <div>

                                                    {
                                                        categories.length > 1
                                                            ?
                                                            <>
                                                                <h2 class="border-bottom filter-title">All Categories</h2>

                                                                <div class="mb-30 filter-options">
                                                                    {
                                                                        categories.map((v, i) => {
                                                                            return (

                                                                                <div class="custom-control custom-checkbox mb-3">
                                                                                    <input onClick={() => filterCategry(v.slug)} type="checkbox" class="custom-control-input me-2" id={v.slug} />
                                                                                    <label class="custom-control-label" for={v.slug}>{v.name}</label>
                                                                                </div>

                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            </>
                                                            :
                                                            ''
                                                    }





                                                    {/* <!--seating option end--> */}
                                                    <h2 class="font-xbold body-font border-bottom filter-title">Cuisines</h2>
                                                    <div class="mb-3 filter-options" id="cusine-options">
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Chinese" checked />
                                                            <label class="custom-control-label" for="Chinese">Chinese</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Italian" />
                                                            <label class="custom-control-label" for="Italian">Italian</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Mexican" />
                                                            <label class="custom-control-label" for="Mexican">Mexican</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Thai" />
                                                            <label class="custom-control-label" for="Thai">Thai</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Gujarati" />
                                                            <label class="custom-control-label" for="Gujarati">Gujarati</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="Panjabi" />
                                                            <label class="custom-control-label" for="Panjabi">Panjabi</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input type="checkbox" class="custom-control-input" id="South-Indian" />
                                                            <label class="custom-control-label" for="South-Indian">South Indian</label>
                                                        </div>
                                                    </div>

                                                    {/* <!-- cusine filters end --> */}
                                                    {/* <h2 class="font-xbold body-font border-bottom filter-title">Price Range</h2>
                                                <div class="mb-3 theme-clr xs2-font d-flex justify-content-between">
                                                    <span id="slider-range-value1">$100</span>
                                                    <span id="slider-range-value2">$10,000</span>
                                                </div>
                                                <div class="mb-30 filter-options">
                                                    <div>
                                                        <div id="slider-range">
                                                            <form>
                                                                <div class="form-group">
                                                                    <input type="range" class="form-control-range" id="" />
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                    <h2 class="border-bottom filter-title">Price Filter</h2>
                                                    <div class="mb-3 filter-options" id="services-options">

                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input onClick={() => priceFilter(0, 250)} type="radio" name='price' class="custom-control-input me-2" id="0-250" />
                                                            <label class="custom-control-label" for="0-250">Rs.0 to Rs.250</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input onClick={() => priceFilter(251, 500)} type="radio" name='price' class="custom-control-input me-2" id="251-500" />
                                                            <label class="custom-control-label" for="251-500">Rs.251 to Rs.500</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input onClick={() => priceFilter(501, 750)} type="radio" name='price' class="custom-control-input me-2" id="501-750" />
                                                            <label class="custom-control-label" for="501-750">Rs.501 to Rs.750</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input onClick={() => priceFilter(751, 1000)} type="radio" name='price' class="custom-control-input me-2" id="751-1000" />
                                                            <label class="custom-control-label" for="751-1000">Rs.751 to Rs.1000</label>
                                                        </div>
                                                        <div class="custom-control custom-checkbox mb-3">
                                                            <input onClick={() => priceFilter(1001, '')} type="radio" name='price' class="custom-control-input me-2" id="1001" />
                                                            <label class="custom-control-label" for="1001">Rs.1001 and above</label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content col-md-9">
                                        <div class="d-flex justify-content-between border-bottom align-items-center">
                                            <h2 class="title">Products</h2>
                                            <div class="filters-actions">
                                                <div>
                                                    <button class="btn filter-btn d-md-none"><svg xmlns="http://www.w3.org/2000/svg" class="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" /></svg>
                                                        Filter</button>
                                                </div>
                                                <div class="d-flex align-items-center">

                                                    <div class="dropdown">
                                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Sort By : 
                                                        </button>
                                                        <ul class="dropdown-menu dropdown-menu-end">
                                                            <li className='cursor-pointer' onClick={ () => filterSorting(1) }><a class="dropdown-item cursor-pointer">Name ASC (A-Z)</a></li>
                                                            <li onClick={ () => filterSorting(2) }><a class="dropdown-item cursor-pointer">Name DESC (Z-A)</a></li>
                                                            <li onClick={ () => filterSorting(3) }><a class="dropdown-item cursor-pointer">Price ASC </a></li>
                                                            <li onClick={ () => filterSorting(4) }><a class="dropdown-item cursor-pointer">Price DESC </a></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div class="row row-gap-3">

                                            {
                                                products.length > 1
                                                    ?
                                                    products.map((v, i) => {
                                                        return (
                                                            <Product type={2} data={v} key={i} />
                                                        )
                                                    })
                                                    :
                                                    "No Record Found !!"
                                            }

                                            {

                                            }




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
