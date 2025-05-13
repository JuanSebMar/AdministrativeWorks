import {
  AppShell,
  Avatar,
  Burger,
  Group,
  NavLink,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAlertTriangle,
  IconCalendar,
  IconClipboardList,
  IconDashboard,
  IconMessageCircle,
  IconUsers,
} from "@tabler/icons-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { icon: IconDashboard, label: "Dashboard", path: "/" },
  { icon: IconUsers, label: "Usuarios", path: "/users" },
  { icon: IconClipboardList, label: "Rubros y Tareas", path: "/tasks" },
  { icon: IconCalendar, label: "Planificación", path: "/planning" },
  { icon: IconAlertTriangle, label: "Incidencias", path: "/incidents" },
  { icon: IconMessageCircle, label: "Reclamos", path: "/claims" },
];

export function AppLayout() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md">
      <AppShell.Header>
        <Group
          h="100%"
          px="md"
          justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Text
              size="xl"
              fw={700}>
              Administrative Works
            </Text>
          </Group>
          <Group>
            <UnstyledButton>
              <Group>
                <Avatar
                  color="blue"
                  radius="xl">
                  AW
                </Avatar>
                <div>
                  <Text
                    size="sm"
                    fw={500}>
                    Admin User
                  </Text>
                  <Text
                    size="xs"
                    c="dimmed">
                    admin@example.com
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            component={Link}
            to={item.path}
            label={item.label}
            leftSection={
              <item.icon
                size="1.2rem"
                stroke={1.5}
              />
            }
            active={location.pathname === item.path}
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
