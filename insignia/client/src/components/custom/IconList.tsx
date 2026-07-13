import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { iconList } from "../../constants/icons";
import Icon from "./Icon";
import { coloricons } from "../../constants/coloricons";

const IconList = ({
  icon,
  setIcon,
}: {
  icon: string;
  setIcon: (icon: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div
          className="px-3 cursor-pointer rounded-md h-[50px] flex items-center gap-2"
      >
        <label
        >Icon</label>
        <div
          className="p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center my-2"
          onClick={() => setIsOpen(true)}
        >
          {icon.includes("Icon") ? (
            <img
              src={icon}
              alt={icon}
              style={{ width: `${20}px`, height: `${20}px` }}
            />
          ) : (
            <Icon name={icon} color={"#000"} size={50} />
          )}
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pic Your Favorite Icon</DialogTitle>
            <DialogDescription>
              <Tabs defaultValue="icon">
                <TabsList>
                  <TabsTrigger value="icon">Icons</TabsTrigger>
                  <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                </TabsList>
                <TabsContent value="icon" className="w-full">
                  <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 overflow-auto h-[300px] max-w-lg min-w-md max-h-lg min-h-md p-2">
                    {iconList.map((ic, index) => (
                      <li
                        key={index}
                        className={`p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center ${
                          ic === icon ? "bg-blue-200" : ""
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          setIcon(ic);
                        }}
                      >
                        <Icon name={ic} color={"#000"} size={20} />
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="color-icon">
                  Color Icon List
                  <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 overflow-auto h-[300px] max-w-lg min-w-md max-h-lg min-h-md p-2">
                    {coloricons.map((ic, index) => (
                      <li
                        key={index}
                        className={`p-3 cursor-pointer bg-gray-200 rounded-md w-[50px] h-[50px] flex items-center justify-center ${
                          ic === icon ? "bg-blue-200" : ""
                        }`}
                        onClick={() => {
                          setIsOpen(false);
                          setIcon(ic);
                        }}
                      >
                        <img src={ic} alt={ic} />
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IconList;
