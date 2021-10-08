interface Props {
  routine: any;
}

const UpdateForm = ({ routine }: Props) => {
  return <div>this is a updateForm for {routine.name}</div>;
};

export default UpdateForm;
