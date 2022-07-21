export const convertNumberToAssessment = (number: string): string => {
    let value = "";
    switch(number) {
      case "1":
        value = "Muy mala";
        break;
      case "2":
        value = "Mala";
        break;
      case "3":
        value = "Regular";
        break;
      case "4":
        value = "Buena";
        break;
      case "5":
        value = "Muy buena";
        break;
      case "No Aplica":
        value = "No Aplica";
        break;
      default: 
        break;
    }
    return value;
}

export const convertNameToSelectedImg = (name: string): string => {
  let value = "";
  switch(name){
    case "cara1.png":
      value = "cara-c1.png";
      break;
    case "cara2.png":
      value = "cara-c2.png";
      break;
    case "cara3.png":
      value = "cara-c3.png";
      break;
    case "cara4.png":
      value = "cara-c4.png";
      break;
    case "cara5.png":
      value = "cara-c5.png";
      break;
    case "na.png":
      value = "na-c.png";
      break;
    default:
      break;
  }
  return value;
};

export const convertNameToUnselectedImg = (name: string): string => {
  let value = "";
  switch(name){
    case "cara-c1.png":
      value = "cara1.png";
      break;
    case "cara-c2.png":
      value = "cara2.png";
      break;
    case "cara-c3.png":
      value = "cara3.png";
      break;
    case "cara-c4.png":
      value = "cara4.png";
      break;
    case "cara-c5.png":
      value = "cara5.png";
      break;
    case "na-c.png":
      value = "na.png";
      break;
    default:
      break;
  }
  return value;
};

export const generateArray = (n: number): number[] => {
    return Array.from({length: n}, (v, i) => i);
}