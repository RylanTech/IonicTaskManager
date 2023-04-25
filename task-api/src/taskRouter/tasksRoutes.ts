import { Router } from 'express';
import { deleteTask, getTasks, postTask, putTask } from '../controllers/TaskActions';

const router = Router();

router.get("/", getTasks);
router.post("/", postTask);
router.put("/:taskId", putTask);
router.delete("/:taskId", deleteTask);

export default router;