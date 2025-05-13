import {
  Badge,
  Button,
  Group,
  Modal,
  Progress,
  Select,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import type { Task } from "../services/mockData";
import { mockData } from "../services/mockData";

type TaskFormValues = {
  name: string;
  category: string;
  status: Task["status"];
};

const categories = [
  "Electricidad",
  "Plomería",
  "Albañilería",
  "Pintura",
  "Carpintería",
];

export function Tasks() {
  const [tasks, setTasks] = useState(mockData.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<TaskFormValues>({
    initialValues: {
      name: "",
      category: categories[0],
      status: "Pendiente",
    },
    validate: {
      name: (value) => (value.length < 2 ? "Nombre muy corto" : null),
    },
  });

  const handleSubmit = (values: TaskFormValues) => {
    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...values, progress: task.progress }
            : task
        )
      );
    } else {
      setTasks([...tasks, { id: crypto.randomUUID(), ...values, progress: 0 }]);
    }
    setModalOpened(false);
    form.reset();
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    form.setValues(task);
    setModalOpened(true);
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleProgressChange = (taskId: string, newProgress: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, progress: newProgress } : task
      )
    );
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text
          size="xl"
          fw={700}>
          Rubros y Tareas
        </Text>
        <Button
          onClick={() => {
            setEditingTask(null);
            form.reset();
            setModalOpened(true);
          }}>
          Nueva Tarea
        </Button>
      </Group>

      <Tabs defaultValue={categories[0]}>
        <Tabs.List>
          {categories.map((category) => (
            <Tabs.Tab
              key={category}
              value={category}>
              {category}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {categories.map((category) => (
          <Tabs.Panel
            key={category}
            value={category}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tarea</Table.Th>
                  <Table.Th>Estado</Table.Th>
                  <Table.Th>Progreso</Table.Th>
                  <Table.Th>Acciones</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task) => (
                    <Table.Tr key={task.id}>
                      <Table.Td>{task.name}</Table.Td>
                      <Table.Td>
                        <Badge
                          color={
                            task.status === "Pendiente"
                              ? "red"
                              : task.status === "En Proceso"
                              ? "yellow"
                              : "green"
                          }>
                          {task.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        <Group
                          gap="xs"
                          align="center">
                          <Progress
                            value={task.progress}
                            size="sm"
                            style={{ flex: 1 }}
                          />
                          <Group gap={4}>
                            <Button
                              variant="subtle"
                              size="xs"
                              onClick={() =>
                                handleProgressChange(
                                  task.id,
                                  Math.max(0, task.progress - 10)
                                )
                              }>
                              <IconMinus size="1rem" />
                            </Button>
                            <Text size="sm">{task.progress}%</Text>
                            <Button
                              variant="subtle"
                              size="xs"
                              onClick={() =>
                                handleProgressChange(
                                  task.id,
                                  Math.min(100, task.progress + 10)
                                )
                              }>
                              <IconPlus size="1rem" />
                            </Button>
                          </Group>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        <Group gap="xs">
                          <Button
                            variant="subtle"
                            color="blue"
                            size="xs"
                            onClick={() => handleEdit(task)}>
                            <IconEdit size="1.2rem" />
                          </Button>
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            onClick={() => handleDelete(task.id)}>
                            <IconTrash size="1.2rem" />
                          </Button>
                        </Group>
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
        ))}
      </Tabs>

      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingTask(null);
          form.reset();
        }}
        title={editingTask ? "Editar Tarea" : "Nueva Tarea"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Nombre"
              placeholder="Nombre de la tarea"
              {...form.getInputProps("name")}
            />
            <Select
              label="Rubro"
              placeholder="Seleccione un rubro"
              data={categories.map((cat) => ({ value: cat, label: cat }))}
              {...form.getInputProps("category")}
            />
            <Select
              label="Estado"
              placeholder="Seleccione un estado"
              data={[
                { value: "Pendiente", label: "Pendiente" },
                { value: "En Proceso", label: "En Proceso" },
                { value: "Completado", label: "Completado" },
              ]}
              {...form.getInputProps("status")}
            />
            <Button type="submit">
              {editingTask ? "Guardar Cambios" : "Crear Tarea"}
            </Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
}
