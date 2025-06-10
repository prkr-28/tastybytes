const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-2xl text-center">
        <h3 className="text-lg text-purple-600 font-semibold mb-2 uppercase tracking-wide">
          About Us
        </h3>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to My Food Delivery App 🍔
        </h1>
        <p className="text-gray-600 leading-relaxed mb-4">
          This is my first food delivery web application built using ReactJS and
          Tailwind CSS. It features a dynamic restaurant listing, real-time menu
          fetching, and modern UI design. Whether you're craving pizza, biryani,
          or a quick snack — we've got you covered!
        </p>
        <p className="text-gray-500 text-sm">
          This project is a learning journey focused on React components,
          routing, API integration, custom hooks, and building responsive
          layouts with Tailwind.
        </p>
      </div>
    </div>
  );
};

export default About;
