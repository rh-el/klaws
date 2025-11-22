import { Avatar, Container, Tabs, View } from "reshaped";

function App() {
  return (
    <Container width="1280px">
      <View direction="row" align="center" justify="space-between" gap={6} width="100%">
        <Avatar src="" initials="K" color="primary" variant="faded" size={12} />

        <Tabs variant="borderless" defaultValue="1">
          <Tabs.List>
            <Tabs.Item value="1">worKs</Tabs.Item>
            <Tabs.Item value="2">aKount</Tabs.Item>
          </Tabs.List>
        </Tabs>
      </View>
    </Container>
  );
}

export default App;

<Container width="1280px">
  <View direction="row" align="center" gap={6} width="100%">
    <Avatar src="" initials="K" color="primary" variant="faded" size={12} />

    <View direction="row" justify="end" grow>
      <Tabs variant="borderless" defaultValue="1">
        <Tabs.List>
          <Tabs.Item value="1">worKs</Tabs.Item>
          <Tabs.Item value="2">aKount</Tabs.Item>
        </Tabs.List>
      </Tabs>
    </View>
  </View>
</Container>;
