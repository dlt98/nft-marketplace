interface TabsProps {
  tabContent1: any;
  tabContent2: any;
}
const Tabs = ({ tabContent1, tabContent2 }: TabsProps) => {
  return (
    <div>
      <ul
        className="flex flex-col flex-wrap pl-0 mb-4 list-none border-b-0 nav nav-tabs nav-justified md:flex-row"
        id="tabs-tabJustify"
        role="tablist"
      >
        <li className="flex-grow text-center nav-item" role="presentation">
          <a
            href="#tabs-homeJustify"
            className="block w-full px-6 py-3 my-2 text-xs font-medium leading-tight uppercase border-t-0 border-b-2 border-transparent nav-link border-x-0 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
            id="tabs-home-tabJustify"
            data-bs-toggle="pill"
            data-bs-target="#tabs-homeJustify"
            role="tab"
            aria-selected="true"
          >
            Listed items
          </a>
        </li>
        <li className="flex-grow text-center nav-item" role="presentation">
          <a
            href="#tabs-messagesJustify"
            className="block w-full px-6 py-3 my-2 text-xs font-medium leading-tight uppercase border-t-0 border-b-2 border-transparent nav-link border-x-0 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
            id="tabs-messages-tabJustify"
            data-bs-toggle="pill"
            data-bs-target="#tabs-messagesJustify"
            role="tab"
            aria-selected="false"
          >
            Sold items
          </a>
        </li>
      </ul>
      <div className="tab-content" id="tabs-tabContentJustify">
        <div className="tab-pane fade show active" id="tabs-homeJustify">
          {tabContent1}
        </div>
        <div className="tab-pane fade" id="tabs-messagesJustify">
          {tabContent2}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
