import img404 from '../../assets/images/etchebest404.jpg';

function NotFound() {
  return (
    <div className="relative w-full h-full">
      <img src={img404} alt="etchebest" className="object-cover h-full w-full absolute z-10" />
    </div>
  );
}

export default NotFound;
