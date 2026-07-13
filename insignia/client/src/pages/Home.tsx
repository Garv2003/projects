import {
  Header,
  SideNav,
  IconController,
  BackgroundController,
  LogPreview,
  GroupButton,
} from "@/components/custom";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";

const Home = () => {
  const [color, setColor] = useState<string>(
    localStorage.getItem("color") || "rgba(255, 255, 255, 1)"
  );
  const [size, setSize] = useState<number>(
    parseInt(localStorage.getItem("size") || "280")
  );
  const [rotate, setRotate] = useState<number>(
    parseInt(localStorage.getItem("rotate") || "0")
  );

  const [rounded, setRounded] = useState<number>(
    parseInt(localStorage.getItem("rounded") || "0")
  );
  const [padding, setPadding] = useState<number>(
    parseInt(localStorage.getItem("padding") || "0")
  );
  const [Bgcolor, setBgColor] = useState<string>(
    localStorage.getItem("Bgcolor") || "rgba(255, 255, 255, 1)"
  );

  const [icon, setIcon] = useState<string>("Smile");

  useEffect(() => {
    localStorage.setItem("color", color);
    localStorage.setItem("size", size.toString());
    localStorage.setItem("rotate", rotate.toString());

    localStorage.setItem("rounded", rounded.toString());
    localStorage.setItem("padding", padding.toString());
    localStorage.setItem("Bgcolor", Bgcolor);

    localStorage.setItem("icon", icon);
  }, [color, size, rotate, rounded, padding, Bgcolor, icon]);

  return (
    <div className="relative">
      <Header />
      <div className="w-64 fixed pt-2">
        <SideNav />
      </div>
      <div className="ml-64 grid grid-cols-1 md:grid-cols-6 p-2">
        <div className="md:col-span-2 border shadow-sm bg-white dark:bg-gray-800 rounded-lg">
          <Tabs.Root
            className="flex flex-col w-full shadow-[0_2px_10px] p-1 shadow-blackA2"
            defaultValue="tab1"
          >
            <Tabs.List className="shrink-0 flex border-b border-mauve6">
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="tab1"
              >
                Icon
              </Tabs.Trigger>
              <Tabs.Trigger
                className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-mauve11 select-none first:rounded-tl-md last:rounded-tr-md hover:text-violet11 data-[state=active]:text-violet11 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
                value="tab2"
              >
                Background
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="tab1"
            >
              <IconController
                color={color}
                setColor={setColor}
                size={size}
                setSize={setSize}
                rotate={rotate}
                setRotate={setRotate}
                icon={icon}
                setIcon={setIcon}
              />
            </Tabs.Content>
            <Tabs.Content
              className="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="tab2"
            >
              <BackgroundController
                rounded={rounded}
                padding={padding}
                Bgcolor={Bgcolor}
                setRounded={setRounded}
                setPadding={setPadding}
                setBgColor={setBgColor}
              />
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div className="md:col-span-4 items-center justify-center flex flex-col border shadow-sm ml-2 rounded-lg">
          <LogPreview
            Bgcolor={Bgcolor}
            rounded={rounded}
            padding={padding}
            color={color}
            size={size}
            rotate={rotate}
            icon={icon}
          />
          <GroupButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
