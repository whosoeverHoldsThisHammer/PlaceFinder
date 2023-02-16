import m from "mithril";
import data from "./locations"

var root = document.body

const pattern = /[^,\s][^\,]*[^,\s]*/g
const rgx = new RegExp(pattern)

const getAvaliableOptions = (locations, keyword) => {
    let keywords = Search.keyword.match(pattern)
    console.log(keywords)
    let matches = locations
        .filter(location => {
            return keywords[0] === "" ? location : location.city.toLowerCase().includes(keywords[0].toLowerCase())
        })
        .filter(location => {
            let result = location

            if (keywords[1] != undefined) {
                result = location.county.toLowerCase().includes(keywords[1].toLowerCase()) || location.state.toLowerCase().includes(keywords[1].toLowerCase())
            }

            if (keywords[2] != undefined) {
                result = location.state.toLowerCase().includes(keywords[2].toLowerCase())
            }

            return result

        })

    return matches
}

const Search = {
    data: {},
    oninit: (vnode) => {
        Search.keyword = ""
        Search.data = vnode.attrs.data
    },
    oncreate: () => {
        document.getElementById("search").focus()
    },
    view: (vnode) => {
        return m("div.w-full flex justify-center p-24", [
            m("div.w-full max-w-sm", [
                [
                    m("label", { "class": "block text-sm font-medium text-gray-700" },
                        "Localidad"
                    ),
                    m("div", { "class": "mt-1 flex rounded-md shadow-sm" },
                        [
                            m("div", { "class": "relative flex flex-grow items-stretch focus-within:z-10" },
                                m("input", {
                                    "id": "search", "class": "block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm", "type": "text", "placeholder": "Tipea para ver resultados", "value": Search.keyword, "oninput": (e) => {
                                        Search.keyword = e.target.value
                                    }
                                })

                            )
                        ]
                    ),
                    Search.keyword.length > 0
                        ? getAvaliableOptions(data.locations, Search.keyword).map(location => {
                            return m("div", [
                                m("span", location.city + ", "),
                                m("span", { "class": "text-gray-500" }, location.county + ", "),
                                m("span", { "class": "text-gray-500" }, location.state),
                            ])
                        })
                        : null
                ]
            ])
        ])
    }
}

m.mount(root, {
    view: function () {
        return m(Search, { data })
    }
})

