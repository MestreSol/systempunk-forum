export type Project = {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    type: "Jogo" | "Livro" | "Historia";
    link: string;
}