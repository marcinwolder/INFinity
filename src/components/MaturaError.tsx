import React from "react";

const MaturaError: React.FC<{
  url: string;
}> = ({ url }) => {
  return (
    <>
      <div className="chat chat-start">
        <div className="chat-bubble">
          <h1 className="text-3xl font-black text-orange-700">DEV info:</h1>
          <p>Brak komponentu zawierającego zadanie!</p>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">
          Dodaj go na ścieżce <code>/public{url}</code>
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">
          Możesz w nim korzystać z przygotowanych komponentów widocznych poniżej
          (będą wypisane później)
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-bubble">Dasz radę 😎</div>
      </div>
    </>
  );
};

export default MaturaError;
