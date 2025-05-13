import {
  Badge,
  Button,
  Group,
  Modal,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import type { Incident } from "../services/mockData";
import { mockData } from "../services/mockData";

type IncidentFormValues = {
  category: string;
  description: string;
  status: Incident["status"];
};

const categories = [
  "Electricidad",
  "Plomería",
  "Albañilería",
  "Pintura",
  "Carpintería",
];

export function Incidents() {
  const [incidents, setIncidents] = useState(mockData.incidents);
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null);
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm<IncidentFormValues>({
    initialValues: {
      category: categories[0],
      description: "",
      status: "Pendiente",
    },
    validate: {
      description: (value) =>
        value.length < 10
          ? "La descripción debe tener al menos 10 caracteres"
          : null,
    },
  });

  const handleSubmit = (values: IncidentFormValues) => {
    if (editingIncident) {
      setIncidents(
        incidents.map((incident) =>
          incident.id === editingIncident.id
            ? { ...incident, ...values }
            : incident
        )
      );
    } else {
      setIncidents([
        ...incidents,
        {
          id: crypto.randomUUID(),
          ...values,
          createdAt: new Date(),
        },
      ]);
    }
    setModalOpened(false);
    form.reset();
    setEditingIncident(null);
  };

  const handleEdit = (incident: Incident) => {
    setEditingIncident(incident);
    form.setValues(incident);
    setModalOpened(true);
  };

  const handleDelete = (incidentId: string) => {
    setIncidents(incidents.filter((incident) => incident.id !== incidentId));
  };

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Text
          size="xl"
          fw={700}>
          Gestión de Incidencias
        </Text>
        <Button
          onClick={() => {
            setEditingIncident(null);
            form.reset();
            setModalOpened(true);
          }}>
          Nueva Incidencia
        </Button>
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Rubro</Table.Th>
            <Table.Th>Descripción</Table.Th>
            <Table.Th>Estado</Table.Th>
            <Table.Th>Fecha</Table.Th>
            <Table.Th>Acciones</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {incidents.map((incident) => (
            <Table.Tr key={incident.id}>
              <Table.Td>{incident.category}</Table.Td>
              <Table.Td>{incident.description}</Table.Td>
              <Table.Td>
                <Badge
                  color={
                    incident.status === "Pendiente"
                      ? "red"
                      : incident.status === "En Proceso"
                      ? "yellow"
                      : "green"
                  }>
                  {incident.status}
                </Badge>
              </Table.Td>
              <Table.Td>
                {incident.createdAt.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <Button
                    variant="subtle"
                    color="blue"
                    size="xs"
                    onClick={() => handleEdit(incident)}>
                    <IconEdit size="1.2rem" />
                  </Button>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={() => handleDelete(incident.id)}>
                    <IconTrash size="1.2rem" />
                  </Button>
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
          setEditingIncident(null);
          form.reset();
        }}
        title={editingIncident ? "Editar Incidencia" : "Nueva Incidencia"}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <Select
              label="Rubro"
              placeholder="Seleccione un rubro"
              data={categories.map((cat) => ({ value: cat, label: cat }))}
              {...form.getInputProps("category")}
            />
            <Textarea
              label="Descripción"
              placeholder="Describa la incidencia..."
              minRows={3}
              {...form.getInputProps("description")}
            />
            <Select
              label="Estado"
              placeholder="Seleccione un estado"
              data={[
                { value: "Pendiente", label: "Pendiente" },
                { value: "En Proceso", label: "En Proceso" },
                { value: "Resuelto", label: "Resuelto" },
              ]}
              {...form.getInputProps("status")}
            />
            <Button type="submit">
              {editingIncident ? "Guardar Cambios" : "Crear Incidencia"}
            </Button>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
}
