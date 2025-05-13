import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import type { User } from "../services/mockData";
import { mockData } from "../services/mockData";

type UserFormValues = {
  name: string;
  email: string;
  role: User["role"];
};

export function Users() {
  const [users, setUsers] = useState(mockData.users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<UserFormValues>({
    initialValues: {
      name: "",
      email: "",
      role: "Empleado",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      name: (value) => (value.length < 2 ? "Nombre muy corto" : null),
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    if (editingUser) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...values } : user
        )
      );
    } else {
      setUsers([...users, { id: crypto.randomUUID(), ...values }]);
    }
    setModalOpened(false);
    form.reset();
    setEditingUser(null);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setValues(user);
    setModalOpened(true);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text
          size="xl"
          fw={700}>
          Gestión de Usuarios
        </Text>
        <Button
          onClick={() => {
            setEditingUser(null);
            form.reset();
            setModalOpened(true);
          }}>
          Nuevo Usuario
        </Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Nombre</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Rol</Table.Th>
            <Table.Th>Acciones</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {users.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>{user.role}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon
                    variant="subtle"
                    color="blue"
                    onClick={() => handleEdit(user)}>
                    <IconEdit size="1.2rem" />
                  </ActionIcon>
                  <ActionIcon
                    variant="subtle"
                    color="red"
                    onClick={() => handleDelete(user.id)}>
                    <IconTrash size="1.2rem" />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setEditingUser(null);
          form.reset();
        }}
        title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Nombre"
              placeholder="Nombre completo"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="email@ejemplo.com"
              {...form.getInputProps("email")}
            />
            <Select
              label="Rol"
              placeholder="Seleccione un rol"
              data={[
                { value: "Administrador", label: "Administrador" },
                { value: "Empleado", label: "Empleado" },
                { value: "Cliente", label: "Cliente" },
                { value: "Proveedor", label: "Proveedor" },
              ]}
              {...form.getInputProps("role")}
            />
            <Button type="submit">
              {editingUser ? "Guardar Cambios" : "Crear Usuario"}
            </Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
}
