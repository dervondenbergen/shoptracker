const cheerio = require('cheerio');
const atob = require('atob');

module.exports = [
    {
        name: "Figma Shirt Large",
        skip: true,
        sites: [{
            name: "Europe Store",
            link: "https://store-eu.figma.com/products/design-in-bloom-tee",
            file: {
                url: "https://test.felix.dm/figma-shirt.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".variants[]|select(.option1 == \"L\").available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
        }]
    },
    {
        name: "Unifi Switch Flex",
        skip: true,
        sites: [{
            name: "Europe Store",
            link: "https://eu.store.ui.com/collections/unifi-network-routing-switching/products/usw-flex",
            file: {
                url: "https://test.felix.dm/usw-flex.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
        }]
    },
    {
     	name: "Unifi Camera G5 Flex",
        skip: true,
        sites: [{
            name: "Europe Store",
            link: "https://eu.store.ui.com/collections/unifi-protect/products/camera-g5-flex-ea",
            file: {
                url: "https://test.felix.dm/g5-flex.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
	}]
    },
    {
        name: "Flipper Zero",
	skip: true,
        sites: [{
            name: "Flipper Zero",
            link: "https://lab401.com/products/flipper-zero?variant=42927883452646",
            file: {
                url: "https://test.felix.dm/flipper-zero.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
        }]
    },
    {
        name: "Unifi Camera AI Theta",
        skip: true,
        sites: [{
            name: "Europe Store",
            link: "https://eu.store.ui.com/collections/unifi-protect-cameras/products/uvc-ai-theta-ea",
            file: {
                url: "https://test.felix.dm/uvc-ai-theta-ea.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
        }]
    },
    {
        name: "Bobbie Goods! Coloring Book",
        skip: true,
        sites: [{
            name: "shop",
            link: "https://bobbiegoods.com/collections/frontpage/products/coloring-book-spring-summer-22",
            file: {
                url: "https://test.felix.dm/coloring-book.json",
                selectors: [{
                    name: "Nicht mehr Sold Out",
                    selector: ".available",
                    test: true,
                    timeout: 1
                }],
                type: "json"
            }
        }]
    },
    {
        name: "Elgato Solid Arm",
        skip: true,
        sites: [
            {
                name: "elgato.com",
                link: "https://www.elgato.com/de/solid-arm",
                file: {
                    url: "https://dealer-edge.elgato.com/products/catalogs/f9edac4a-fa13-412c-9f1e-21c2c73a7c22.json",
                    selectors: [
                        {
                            name: "DE Region verfügbar",
                            selector: ".regions.DE.purchasable",
                            test: true,
                            timeout: 5
                        },
                        {
                            name: "EU Region verfügbar",
                            selector: ".regions.EU.purchasable",
                            test: true,
                            timeout: 5
                        }
                    ],
                    type: "json"
                }
            },
            {
                name: "Geizhals",
                link: "https://geizhals.at/elgato-multi-mount-solid-arm-10aag9901-a2415931.html",
                file: {
                    url: "https://geizhals.at/elgato-multi-mount-solid-arm-10aag9901-a2415931.html?t=alle&plz=&va=b&vl=at&hloc=at&hloc=de&hloc=pl&hloc=uk&hloc=eu&v=l#offerlist",
                    selectors: [
                        {
                            name: "Liste nicht leer",
                            selector: ".steel_list_container .row",
                            method: (elements) => elements.length > 0,
                            test: true,
                            timeout: 5
                        }
                    ],
                    type: "html"
                }
            }
        ]
    },
    {
        name: "Elgato Green Screen",
        skip: true,
        sites: [
            {
                name: "elgato.com",
                link: "https://www.elgato.com/de/gaming/green-screen",
                file: {
                    url: "https://dealer-edge.elgato.com/products/catalogs/10737390-9925-4aaa-a8c9-bd65eee0bca2.json",
                    selectors: [
                        {
                            name: "DE Region verfügbar",
                            selector: ".regions.DE.purchasable",
                            test: true,
                            timeout: 60
                        },
                        {
                            name: "EU Region verfügbar",
                            selector: ".regions.EU.purchasable",
                            test: true,
                            timeout: 60
                        }
                    ],
                    type: "json"
                }
            }
        ]
    },
    {
        name: "RTX 3000",
        skip: true,
        sites: [
            {
                name: "NBB",
                link: "https://www.notebooksbilliger.de/pc+hardware/grafikkarten/nvidia/geforce+rtx+3000+serie+nvidia",
                file: {
                    url: "https://www.notebooksbilliger.de/extensions/apii/filter.php?filters=on&listing=on&advisor=&action=applyFilters&category_id=24238&page=1&perPage=50&sort=price&order=asc&availability=alle&eqsqid=",
                    selectors: [
                        {
                            name: "3060 unter €600",
                            selector: ".js-listing-item-GTM",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const price = parseInt(card.data('price'), 10);
                                    const name = card.find('[title]').attr('title');
                                    const type = /3070/.test(name)
                                    const availability = card.find('.add2cart_Btn').text().trim() == 'In den Warenkorb'
                                  
                                    return type && availability && price < 600 && price > 200
                                }).length > 0;
                            },
                            test: true
                        },
                        {
                            name: "3070 unter €800",
                            selector: ".js-listing-item-GTM",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const price = parseInt(card.data('price'), 10);
                                    const name = card.find('[title]').attr('title');
                                    const type = /3070/.test(name)
                                    const availability = card.find('.add2cart_Btn').text().trim() == 'In den Warenkorb'
                                  
                                    return type && availability && price < 800 && price > 200
                                }).length > 0;
                            },
                            test: true
                        },
                        {
                            name: "3080 unter €1000",
                            selector: ".js-listing-item-GTM",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const price = parseInt(card.data('price'), 10);
                                    const name = card.find('[title]').attr('title');
                                    const type = /3080/.test(name)
                                    const availability = card.find('.add2cart_Btn').text().trim() == 'In den Warenkorb'
                                  
                                    return type && availability && price < 1000 && price > 200
                                }).length > 0;
                            },
                            test: true
                        },
                        {
                            name: "3090 unter €1800",
                            selector: ".js-listing-item-GTM",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const price = parseInt(card.data('price'), 10);
                                    const name = card.find('[title]').attr('title');
                                    const type = /3090/.test(name)
                                    const availability = card.find('.add2cart_Btn').text().trim() == 'In den Warenkorb'
                                  
                                    return type && availability && price < 1800 && price > 200
                                }).length > 0;
                            },
                            test: true
                        }
                    ],
                    type: "html"
                }
            },
            {
                name: "Willhaben",
                link: "https://mobile.willhaben.at/kaufen-und-verkaufen/marktplatz/pc-komponenten/grafikkarten-5882?rows=300&isNavigation=false&keyword=rtx&page=1&isSearchResult=true",
                file: {
                    url: "https://mobile.willhaben.at/kaufen-und-verkaufen/marktplatz/pc-komponenten/grafikkarten-5882?rows=300&isNavigation=false&keyword=rtx&page=1&isSearchResult=true",
                    selectors: [
                        {
                            name: "3060 unter €600",
                            selector: ".search-result-entry",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const name  = card.find('.heading-text').text();
                                    const type = /3060/.test(name);
                                    const keinTausch = !/tausch/i.test(name);
                                    const nichtReserviert = !/reserviert/i.test(name);
                                    const keinAdapter = !/adapter/i.test(name);
                                    const nicht2000 = !/20\d0/i.test(name)

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                                                      
                                    return type && keinTausch && nichtReserviert && keinAdapter && nicht2000 && price < 600 && price > 200
                                }).length > 0;
                            },
                            test: true,
                            timeout: 5
                        },
                        {
                            name: "3070 unter €800",
                            selector: ".search-result-entry",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const name  = card.find('.heading-text').text();
                                    const type = /3070/.test(name);
                                    const keinTausch = !/tausch/i.test(name);
                                    const nichtReserviert = !/reserviert/i.test(name);
                                    const keinAdapter = !/adapter/i.test(name);
                                    const nicht2000 = !/20\d0/i.test(name)

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                                                      
                                    return type && keinTausch && nichtReserviert && keinAdapter && nicht2000 && price < 800 && price > 200
                                }).length > 0;
                            },
                            test: true,
                            timeout: 5
                        },
                        {
                            name: "3080 unter €1000",
                            selector: ".search-result-entry",
                            method: (elements, $) => {
                                return elements.filter((i, c) => {
                                    const card = $(c);
                                    const name  = card.find('.heading-text').text();
                                    const type = /3080/.test(name)
                                    const keinTausch = !/tausch/i.test(name)
                                    const nichtReserviert = !/reserviert/i.test(name)
                                    const keinAdapter = !/adapter/i.test(name)
                                    const nicht2000 = !/20\d0/i.test(name)

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                  
                                    return type && keinTausch && nichtReserviert && keinAdapter && nicht2000 && price < 1000 && price > 200
                                }).length > 0;
                            },
                            test: true,
                            timeout: 5
                        }
                    ],
                    type: "html"
                }
            },
            {
                name: "Geizhals - 3060 unter €600",
                link: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3060&v=l&bpmax=600",
                file: {
                    url: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3060&v=l&bpmax=600",
                    selectors: [
                        {
                            name: "Liste nicht leer",
                            selector: ".productlist__product--available",
                            method: (elements) => elements.length > 0,
                            test: true
                        }
                    ],
                    type: "html"
                }
            },
            {
                name: "Geizhals - 3070 unter €800",
                link: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3070&v=l&bpmax=800",
                file: {
                    url: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3070&v=l&bpmax=800",
                    selectors: [
                        {
                            name: "Liste nicht leer",
                            selector: ".productlist__product--available",
                            method: (elements) => elements.length > 0,
                            test: true
                        }
                    ],
                    type: "html"
                }
            },
            {
                name: "Geizhals - 3080 unter €1000",
                link: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3080&v=l&bpmax=1000",
                file: {
                    url: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3080&v=l&bpmax=1000",
                    selectors: [
                        {
                            name: "Liste nicht leer",
                            selector: ".productlist__product--available",
                            method: (elements) => elements.length > 0,
                            test: true
                        }
                    ],
                    type: "html"
                }
            },
            {
                name: "Geizhals - 3090 unter €1800",
                link: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3090&v=l&bpmax=1800",
                file: {
                    url: "https://geizhals.at/?cat=gra16_512&xf=9816_03+05+16+-+RTX+3090&v=l&bpmax=1800",
                    selectors: [
                        {
                            name: "Liste nicht leer",
                            selector: ".productlist__product--available",
                            method: (elements) => elements.length > 0,
                            test: true
                        }
                    ],
                    type: "html"
                }
            }
        ]
    }
]
