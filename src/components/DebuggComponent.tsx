interface Props {
  states: unknown[];
}

const DebuggComponent = ({ states }: Props) => {
  return (
    <div className="flex gap-2">
      {states.map((state) => (
        <pre className="p-1 border min-w-[250px] rounded-md">
          {JSON.stringify({ state }, null, 2)}
        </pre>
      ))}
    </div>
  );
};

export default DebuggComponent;
