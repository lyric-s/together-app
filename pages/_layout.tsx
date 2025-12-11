import { Stack } from 'expo-router';

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountWithoutCo" />
      <Stack.Screen name="ChangeMission" />
    </Stack>
  );
}