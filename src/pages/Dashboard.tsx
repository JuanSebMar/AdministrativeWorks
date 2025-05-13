import {
  Badge,
  Grid,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconClipboardList,
  IconPackage,
  IconUsers,
} from "@tabler/icons-react";
import { mockData } from "../services/mockData";

export function Dashboard() {
  const categories = [
    "Electricidad",
    "Plomería",
    "Albañilería",
    "Pintura",
    "Carpintería",
  ];
  const activeIncidents = mockData.incidents.filter(
    (i) => i.status !== "Resuelto"
  );
  const activeTasks = mockData.tasks.filter((t) => t.status !== "Completado");
  const criticalStock = 5; // Mocked value

  return (
    <Stack gap="md">
      <Text
        size="xl"
        fw={700}>
        Dashboard
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper
            withBorder
            p="md"
            radius="md">
            <Group
              justify="space-between"
              mb="xs">
              <Text
                size="sm"
                c="dimmed">
                Incidencias Activas
              </Text>
              <IconAlertTriangle
                size="1.2rem"
                color="red"
              />
            </Group>
            <Text
              size="xl"
              fw={700}>
              {activeIncidents.length}
            </Text>
            <Text
              size="xs"
              c="dimmed">
              Requieren atención
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper
            withBorder
            p="md"
            radius="md">
            <Group
              justify="space-between"
              mb="xs">
              <Text
                size="sm"
                c="dimmed">
                Tareas en Ejecución
              </Text>
              <IconClipboardList
                size="1.2rem"
                color="blue"
              />
            </Group>
            <Text
              size="xl"
              fw={700}>
              {activeTasks.length}
            </Text>
            <Text
              size="xs"
              c="dimmed">
              En progreso
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper
            withBorder
            p="md"
            radius="md">
            <Group
              justify="space-between"
              mb="xs">
              <Text
                size="sm"
                c="dimmed">
                Usuarios Activos
              </Text>
              <IconUsers
                size="1.2rem"
                color="green"
              />
            </Group>
            <Text
              size="xl"
              fw={700}>
              {mockData.users.length}
            </Text>
            <Text
              size="xs"
              c="dimmed">
              En el sistema
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
          <Paper
            withBorder
            p="md"
            radius="md">
            <Group
              justify="space-between"
              mb="xs">
              <Text
                size="sm"
                c="dimmed">
                Stock Crítico
              </Text>
              <IconPackage
                size="1.2rem"
                color="orange"
              />
            </Group>
            <Text
              size="xl"
              fw={700}>
              {criticalStock}
            </Text>
            <Text
              size="xs"
              c="dimmed">
              Items por reponer
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Paper
        withBorder
        p="md"
        radius="md">
        <Title
          order={3}
          mb="md">
          Avance por Rubro
        </Title>
        <Stack gap="md">
          {categories.map((category) => {
            const categoryTasks = mockData.tasks.filter(
              (t) => t.category === category
            );
            const progress =
              categoryTasks.length > 0
                ? Math.round(
                    categoryTasks.reduce(
                      (acc, task) => acc + task.progress,
                      0
                    ) / categoryTasks.length
                  )
                : 0;

            return (
              <div key={category}>
                <Group
                  justify="space-between"
                  mb="xs">
                  <Text size="sm">{category}</Text>
                  <Badge>{progress}%</Badge>
                </Group>
                <Progress
                  value={progress}
                  size="sm"
                />
              </div>
            );
          })}
        </Stack>
      </Paper>

      <Paper
        withBorder
        p="md"
        radius="md">
        <Title
          order={3}
          mb="md">
          Últimas Incidencias
        </Title>
        <Stack gap="xs">
          {mockData.incidents.slice(0, 5).map((incident) => (
            <Group
              key={incident.id}
              justify="space-between">
              <div>
                <Text
                  size="sm"
                  fw={500}>
                  {incident.category}
                </Text>
                <Text
                  size="xs"
                  c="dimmed">
                  {incident.description}
                </Text>
              </div>
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
            </Group>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
