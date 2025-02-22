type ItemType = {
    title: string
    is_visible_eu: boolean
}

export type TopicType = {
    type: string
    items: ItemType[]
}

// academy topic
export const market_type: TopicType[] = [
    {
        type: 'Markets',
        items: [
            {
                title: 'Forex',
                is_visible_eu: true,
            },
            {
                title: 'Derived',
                is_visible_eu: true,
            },
            {
                title: 'Stocks & stock indices',
                is_visible_eu: true,
            },
            {
                title: 'Cryptocurrencies',
                is_visible_eu: true,
            },
            {
                title: 'Commodities',
                is_visible_eu: true,
            },
        ],
    },
]

export const platforms: TopicType[] = [
    {
        type: 'Platforms',
        items: [
            {
                title: 'Deriv MT5',
                is_visible_eu: true,
            },
            {
                title: 'Deriv X',
                is_visible_eu: false,
            },
            {
                title: 'DTrader',
                is_visible_eu: true,
            },
            {
                title: 'DBot',
                is_visible_eu: false,
            },
            {
                title: 'Deriv GO',
                is_visible_eu: false,
            },
        ],
    },
]

export const trade_types: TopicType[] = [
    {
        type: 'Trade types',
        items: [
            {
                title: 'Multipliers',
                is_visible_eu: true,
            },
            {
                title: 'CFDs',
                is_visible_eu: true,
            },
            {
                title: 'Options',
                is_visible_eu: false,
            },
        ],
    },
]

export const resources: TopicType[] = [
    {
        type: 'Resources',
        items: [
            {
                title: 'Market reports',
                is_visible_eu: true,
            },
            {
                title: 'Strategies and tips',
                is_visible_eu: true,
            },
            {
                title: 'Payment methods',
                is_visible_eu: true,
            },
        ],
    },
]

export const combined_filter_type = [...market_type, ...platforms, ...trade_types, ...resources]
