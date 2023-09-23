import React from "react";
import useThemeBasedValue from "../hooks/useThemeBasedValue";
import { MantineProvider as _MantineProvider } from "@mantine/styles";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

const MantineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const theme = useThemeBasedValue("light", "dark");
  return (
    <_MantineProvider theme={{ colorScheme: theme }}>
      <ModalsProvider
        labels={{
          confirm: "Kontynuuj",
          cancel: "Przejdź do rozpoczętej matury",
        }}
      >
        {children}
      </ModalsProvider>
      <Notifications className="fixed bottom-1 right-1" />
    </_MantineProvider>
  );
};

export default MantineProvider;
