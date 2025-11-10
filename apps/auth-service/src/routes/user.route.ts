import { clerkClient } from "@clerk/express";
import e, {Router} from "express";

const router: Router = Router();

router.get("/", async (req, res) => {
    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await clerkClient.users.getUser(id);
    res.status(200).json(user);
});

router.post("/", async (req, res) => {
    type CreateParamas = Parameters<typeof clerkClient.users.createUser>[0];
    const newUser : CreateParamas = req.body;
    const user = await clerkClient.users.createUser(newUser);
    res.status(201).json(user);
});

router.delete("/:id", async (req, res) => {
    const {id} = req.body;
    const user = await clerkClient.users.deleteUser(id);
    res.status(200).json(user);
});


export const userRoute = router;