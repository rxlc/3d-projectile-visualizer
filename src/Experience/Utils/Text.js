import { Text } from 'troika-three-text'

const createText = (text, fontSize) => {
    let newText = new Text();

    newText = new Text();
    newText.text = text
    newText.fontSize = fontSize;
    
    return newText;
}

export default createText;