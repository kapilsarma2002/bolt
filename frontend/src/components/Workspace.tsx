import React, { useEffect, useState } from "react";
import { Steps } from "./workspace/Steps";
import { CodeBlock } from "./workspace/CodeBlock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { Step } from "../types";
import { parseXml } from "../steps";

interface WorkspaceProps {
  prompt: string;
}

export const Workspace: React.FC<WorkspaceProps> = ({ prompt }: {prompt: string}) => {
  const [isStepsOpen, setIsStepsOpen] = useState(true);
  const [steps, setSteps] = useState<Step[]>([]);

  const init = async () => {
    const res = await axios.post(`${BACKEND_URL}/template`, { prompt });
    const {prompts, uiPrompts} = res.data

    setSteps(parseXml(uiPrompts[0]).map((x: Step) => ({
      ...x,
      status: "pending"
    })));

    // const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, { 
    //   messages: [...prompts, prompt].map(content => ({
    //     role: 'user',
    //     content
    //   }))
    // });
  } 

  useEffect(() => {
    init()
  }, [])

  return (
    <div className="flex h-screen bg-gray-900 overflow-hidden">
      {/* Collapsible Steps */}
      <div
        className={`${
          isStepsOpen ? "w-72" : "w-10"
        } flex-shrink-0 flex transition-all duration-300`}
      >
        <div
          className={`${
            isStepsOpen ? "w-72" : "w-0"
          } overflow-hidden transition-all duration-300`}
        >
          <Steps steps={steps} />
        </div>
        <button
          onClick={() => setIsStepsOpen(!isStepsOpen)}
          className="flex-shrink-0 p-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white border-y border-r border-gray-700 rounded-r"
        >
          {isStepsOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="flex-1 overflow-hidden">
        <div className="w-full h-full">
          <CodeBlock />
        </div>
      </div>
    </div>
  );
}
