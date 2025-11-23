import { Actionable, Avatar, Tabs, View } from "reshaped";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <nav role="navigation">
      <View direction="row" align="center" justify={"space-between"} gap={6} width="100%">
        {/* Left: avatar */}
        <Avatar src="" initials="K" color="primary" variant="faded" size={12} />

        {/* Right: tabs, taking the remaining space */}
        <NavBar />

        {/* <View direction="row" justify="end">
          <Tabs variant="borderless" defaultValue="1">
            <Tabs.List>
              <Tabs.Item value="1">worKs</Tabs.Item>
              <Tabs.Item value="2">aKount</Tabs.Item>
            </Tabs.List>
          </Tabs>
        </View> */}
      </View>
    </nav>
  );
}
