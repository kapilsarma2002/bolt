import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Step } from '../../types';

// const steps = [
//   { id: 1, title: 'Analyzing Prompt', status: 'completed' },
//   { id: 2, title: 'Generating Structure', status: 'in-progress' },
//   { id: 3, title: 'Creating Components', status: 'pending' },
//   { id: 4, title: 'Applying Styles', status: 'pending' },
//   { id: 5, title: 'Finalizing', status: 'pending' },
// ];

export function Steps({ steps }: { steps: Step[] }) {
  return (
    <div className="h-full border-r border-gray-800 p-4">
      <h2 className="text-lg font-semibold text-white mb-6">Progress</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="flex items-center space-x-3">
            {step.status === 'completed' && (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            {step.status === 'in-progress' && (
              <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
            )}
            {step.status === 'pending' && (
              <Circle className="h-5 w-5 text-gray-500" />
            )}
            <span className={`text-sm ${
              step.status === 'completed' ? 'text-green-500' :
              step.status === 'in-progress' ? 'text-blue-500' :
              'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}