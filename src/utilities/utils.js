export const conflict = (c1_term, c1_meets, c2_term, c2_meets) => {
  
  if (c1_term == c2_term && c1_meets == c2_meets) {
    return true;
  }
  
  return false;
};