import { v4 as uuidv4} from 'https://jspm.dev/uuid'

export const menuData = [
    {
        name: `Pizza`,
        ingredients: `pepperoni,mushrom,mozarella`,
        price: 14,
        image: `images/pizza_slice.png`,
        type: `food`,
        uuid: uuidv4(),
        isCombo: false
    },
    {
        name: `Hamburger`,
        ingredients: `beef, cheese, lettuce`,
        price: 12,
        image: `images/hamburger.png`,
        type: `food`,
        uuid: uuidv4(),
        isCombo: false
    },
    {
        name: `Beer`,
        ingredients: `grain, hops, yeast, water`,
        price: 12,
        image: `images/beer_draft.png`,
        type: `drink`,
        uuid: uuidv4(),
        isCombo: false,
    }
]