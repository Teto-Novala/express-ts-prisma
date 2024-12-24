import { Request, Response } from "express-serve-static-core";
import { prisma } from "../db/connection";

export async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.status(200).json({
    status: "Success",
    message: "Berhasil mengambil user",
    data: users,
  });
}

export async function createUser(req: Request, res: Response) {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      status: "Failed",
      message: "Nama tidak boleh kosong",
    });
    return;
  }

  const user = await prisma.user.create({
    data: { name },
  });

  res.status(201).json({
    status: "Success",
    message: "Berhasil membuat user",
    data: user,
  });
}

export async function getUserById(req: Request, res: Response) {
  const { id } = req.params;
  const idNumber = parseInt(id);

  const user = await prisma.user.findFirst({ where: { id: idNumber } });

  if (!user) {
    res.status(404).json({
      status: "Failed",
      message: "User tidak ditemukan",
    });
  }

  res.status(200).json({
    status: "Success",
    message: "Berhasil menemukan user",
    data: user,
  });
}

export async function updateUserById(req: Request, res: Response) {
  const { id } = req.params;
  const idNumber = parseInt(id);

  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      status: "Failed",
      message: "Nama tidak boleh kosong",
    });
    return;
  }

  const user = await prisma.user.findFirst({ where: { id: idNumber } });
  if (!user) {
    res.status(404).json({
      status: "Failed",
      message: "User tidak ditemukan",
    });
    return;
  }

  await prisma.user.update({ where: { id: idNumber }, data: { name } });

  res.status(201).json({
    status: "Success",
    message: "Berhasil Mengupdate user",
  });
}

export async function deleteUserById(req: Request, res: Response) {
  const { id } = req.params;
  const idNumber = parseInt(id);
  await prisma.user
    .delete({ where: { id: idNumber } })
    .then(() => {
      res.status(200).json({
        status: "Success",
        message: "Berhasil menghapus akun",
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Failed",
        message: err.meta.cause,
      });
    });
}
