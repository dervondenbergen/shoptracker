const cheerio = require('cheerio');
const atob = require('atob');

module.exports = [
    {
        name: "Elgato Solid Arm",
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
                            test: true
                        },
                        {
                            name: "EU Region verfügbar",
                            selector: ".regions.EU.purchasable",
                            test: true
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
                            test: true
                        }
                    ],
                    type: "html"
                }
            }
        ]
    },
    {
        name: "Elgato Green Screen",
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
                            test: true
                        },
                        {
                            name: "EU Region verfügbar",
                            selector: ".regions.EU.purchasable",
                            test: true
                        }
                    ],
                    type: "json"
                }
            }
        ]
    },
    {
        name: "RTX 3000",
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
                                  
                                    return type && availability && price < 600
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
                                  
                                    return type && availability && price < 800
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
                                  
                                    return type && availability && price < 1000
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

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                                                      
                                    return type && keinTausch && nichtReserviert && keinAdapter && price < 600
                                }).length > 0;
                            },
                            test: true
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

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                                                      
                                    return type && keinTausch && nichtReserviert && keinAdapter && price < 800
                                }).length > 0;
                            },
                            test: true
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

                                    const infoplaceholder = card.find('.additional-info-container div:last-of-type').attr('id');
                                    const infoscript = card.find('.additional-info-container script').html();
                                    const pricehtml = infoscript.split(infoplaceholder)[1].split("('")[1].split("')")[0];
                                    
                                    const price = parseInt(cheerio.load(atob(pricehtml)).text().replace(/[\D\.]/g, ''), 10);
                                  
                                    return type && keinTausch && nichtReserviert && keinAdapter && price < 1000
                                }).length > 0;
                            },
                            test: true
                        }
                    ],
                    type: "html"
                }
            }
        ]
    }
]