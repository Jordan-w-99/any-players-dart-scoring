export interface Player {
    score: number
    name: string
    scoreHistory: number[]
}

export const calculatePlayerAvg = (scoreHistory: number[]): number => {
    if (scoreHistory.length == 0) return 0;
    return scoreHistory.reduce((total, val) => total + val, 0) / scoreHistory.length;
}