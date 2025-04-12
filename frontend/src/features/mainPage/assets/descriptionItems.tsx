import { DescritopnType } from "../../../types/descritopnType";
import { ReactComponent as FirstDescriptionImage } from './images/firstDescriptionImage.svg'
import { ReactComponent as SecondDescriptionImage } from './images/secondDescriptionImage.svg'

export const descritionItems: DescritopnType[] =[ 
    {
        title: 'Знаходь доступні місця',
        description: `Швидкий пошук місць за типом доступності пандуси, тактильна плитка, адаптовані туалети та інше.`,
        image: <FirstDescriptionImage style={{ width: '100px', height: '100px' }}/>
    },
    {
        title: 'Знаходь доступні місця',
        description: `Швидкий пошук місць за типом доступності пандуси, тактильна плитка, адаптовані туалети та інше.`,
        image: <SecondDescriptionImage style={{ width: '100px', height: '100px' }}/>
    },
    {
        title: 'Знаходь доступні місця',
        description: `Швидкий пошук місць за типом доступності пандуси, тактильна плитка, адаптовані туалети та інше.`,
        image: <FirstDescriptionImage style={{ width: '100px', height: '100px' }}/>
    },
]