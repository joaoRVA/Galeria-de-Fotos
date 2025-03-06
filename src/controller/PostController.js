import { request, response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';


const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class PostController {
    async store(request, response) {
        const { description = "Sem descrição" } = request.body;
        const requestImages = request.files;

        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        try {
            const post = await prisma.post.create({
                data: {
                    description,
                    images: {
                        create: images
                    }
                },
                select: {
                    description: true,
                    images: true,
                }
            });

            return response.json(post);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Erro ao criar post" });
        }
    }

    async getImages(request, response) {
        try {
            const images = await prisma.image.findMany({
                select: {
                    id: true,
                    path: true,
                    post: {
                        select: {
                            description: true
                        }
                    }
                },
                
            });

            return response.json(images);
        } catch (error) {
            console.error(error);
            return response.status(500).json({error: "Erro ao buscar imagens"});
        }
    }

    // Requisição para deletar Imagem
    async deleteImage(request, response) {
        // Pega ID da imagem a ser excluída a partir dos parâmetros da URL
        const { id } = request.params;
        console.log(id)
        try {
            // busca imagem no banco de dados de acordo com o ID
            // retorna somente o caminho da img no servidor
            const image = await prisma.image.findUnique({
                where: {id: String(id)},
                select: {path:true}
            });

            if (!image) {
                return response.status(404).json({error: "Imagem não encontrada"});
            }

            // Remove o registro da imagem no banco de dados usando o Prisma
            await prisma.image.delete({
                where: {id: String(id)}
            })

            // excluir arquivo da pasta uploads
            const filePath = path.join(__dirname, "..", "..", "uploads", image.path)
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Erro ao excluir arquivo", err);
                }
            })

            return response.status(200).json({message: "Imagem excluída com sucesso!"})

        } catch (error) {
            console.error("Erro ao excluir imagem", error);
            return response.status(500).json({error: "Erro ao excluir imagem"});
        }
    }
}