export type LetterStatus = 'correct' | 'present' | 'absent' | '';
export type Guess = {
  word: string;
  statuses: LetterStatus[];
};