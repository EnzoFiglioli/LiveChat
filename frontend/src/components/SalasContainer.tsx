import Sala from "./Sala.tsx"

const SalasContainer = () => {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <Sala nombreSala={"ChatArgentino"} />
      <Sala nombreSala={"Olavarria"} />
      <Sala nombreSala={"BuenosAires"} />

    </div>
  )
}

export default SalasContainer;
