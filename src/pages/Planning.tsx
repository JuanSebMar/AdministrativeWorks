import { Badge, Group, Paper, Stack, Text, Title } from "@mantine/core";

type Phase = {
  name: string;
  startDate: Date;
  endDate: Date;
  progress: number;
  status: "Pendiente" | "En Proceso" | "Completado";
};

const phases: Phase[] = [
  {
    name: "Excavación",
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 1, 15),
    progress: 100,
    status: "Completado",
  },
  {
    name: "Estructura",
    startDate: new Date(2024, 1, 1),
    endDate: new Date(2024, 4, 30),
    progress: 75,
    status: "En Proceso",
  },
  {
    name: "Instalaciones",
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 7, 31),
    progress: 30,
    status: "En Proceso",
  },
  {
    name: "Terminaciones",
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 11, 31),
    progress: 0,
    status: "Pendiente",
  },
];

const getMonthName = (date: Date) => {
  return date.toLocaleString("es-ES", { month: "short" });
};

const getMonthsBetween = (start: Date, end: Date) => {
  const months = [];
  const current = new Date(start);
  while (current <= end) {
    months.push(new Date(current));
    current.setMonth(current.getMonth() + 1);
  }
  return months;
};

const getMonthsInProject = () => {
  const allMonths = phases.flatMap((phase) =>
    getMonthsBetween(phase.startDate, phase.endDate)
  );
  const uniqueMonths = Array.from(new Set(allMonths.map((d) => d.getTime())))
    .map((t) => new Date(t))
    .sort((a, b) => a.getTime() - b.getTime());
  return uniqueMonths;
};

export function Planning() {
  const months = getMonthsInProject();
  const projectStart = months[0];
  const projectEnd = months[months.length - 1];
  const totalDays = Math.ceil(
    (projectEnd.getTime() - projectStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Stack gap="md">
      <Title order={2}>Planificación de Obra</Title>

      <Paper
        withBorder
        p="md">
        <Stack gap="md">
          {phases.map((phase) => {
            const startOffset = Math.floor(
              (phase.startDate.getTime() - projectStart.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const duration = Math.ceil(
              (phase.endDate.getTime() - phase.startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            const width = (duration / totalDays) * 100;
            const left = (startOffset / totalDays) * 100;

            return (
              <div key={phase.name}>
                <Group
                  justify="space-between"
                  mb="xs">
                  <Text
                    size="sm"
                    fw={500}>
                    {phase.name}
                  </Text>
                  <Badge
                    color={
                      phase.status === "Pendiente"
                        ? "gray"
                        : phase.status === "En Proceso"
                        ? "blue"
                        : "green"
                    }>
                    {phase.status}
                  </Badge>
                </Group>
                <div
                  style={{
                    position: "relative",
                    height: "24px",
                    background: "#f1f3f5",
                    borderRadius: "4px",
                  }}>
                  <div
                    style={{
                      position: "absolute",
                      left: `${left}%`,
                      width: `${width}%`,
                      height: "100%",
                      background:
                        phase.status === "Completado"
                          ? "#40c057"
                          : phase.status === "En Proceso"
                          ? "#228be6"
                          : "#868e96",
                      borderRadius: "4px",
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: `${left}%`,
                      width: `${(width * phase.progress) / 100}%`,
                      height: "100%",
                      background:
                        phase.status === "Completado"
                          ? "#40c057"
                          : phase.status === "En Proceso"
                          ? "#228be6"
                          : "#868e96",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Stack>
      </Paper>

      <Paper
        withBorder
        p="md">
        <Group
          gap={0}
          style={{ borderBottom: "1px solid #dee2e6" }}>
          {months.map((month) => (
            <div
              key={month.getTime()}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "8px",
                borderRight: "1px solid #dee2e6",
              }}>
              <Text
                size="sm"
                fw={500}>
                {getMonthName(month)}
              </Text>
              <Text
                size="xs"
                c="dimmed">
                {month.getFullYear()}
              </Text>
            </div>
          ))}
        </Group>
      </Paper>
    </Stack>
  );
}
