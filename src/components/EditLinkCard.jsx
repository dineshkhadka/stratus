import React, { useRef, useEffect, useState } from "react";
import { useQuickLinks } from "../stores/useQuickLinks";

function EditLinkCard({
  linkData,
  index,
  size,
  removeLink,
  moveLink,
  changeLink,
}) {
  return (
    <div className="edit-links">
      <span className="edit-links__index">{index + 1}</span>
      <div className="edit-links__wrap">
        <div className="edit-links__two-col">
          <div className="styled-input">
            <label
              className="styled-input__label styled-input__label--small"
              htmlFor={`link-title-${linkData.id}`}
            >
              <span>Link Title</span>
            </label>
            <input
              type="text"
              id={`link-title-${linkData.id}`}
              className="styled-input__input"
              name="timezone-switcher"
              autoComplete="off"
              defaultValue={linkData.title}
              onChange={(e) => {
                changeLink(linkData.id, "title", e.target.value);
              }}
            />
          </div>
          <div className="styled-input">
            <label
              className="styled-input__label styled-input__label--small"
              htmlFor={`link-url-${linkData.id}`}
            >
              <span>Link URL</span>
            </label>
            <input
              type="text"
              id={`link-url-${linkData.id}`}
              className="styled-input__input"
              name="timezone-switcher"
              autoComplete="off"
              defaultValue={linkData.url}
              onChange={(e) => {
                changeLink(linkData.id, "url", e.target.value);
              }}
            />
          </div>
        </div>
        <div className="default-check">
          <input
            type="checkbox"
            className="default-check__input"
            id={`blank-open-${linkData.id}`}
            defaultChecked={linkData.self}
            onChange={(e) => {
              changeLink(linkData.id, "self", !linkData.self);
            }}
          />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="custom-radio checked"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="custom-radio unchecked"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <label className="todo__title" htmlFor={`blank-open-${linkData.id}`}>
            Open in a new tab
          </label>
        </div>
      </div>
      <div className="edit-links__action">
        <div className="edit-links__reorder">
          <button
            className={`btn-icon btn-icon--light ${
              index === 0 ? "btn-icon--disabled" : ""
            }`}
            disabled={index === 0}
            onClick={() => {
              moveLink(index, "up");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
          <button
            className={`btn-icon btn-icon--light btn-icon--flipped ${
              index === size - 1 ? "btn-icon--disabled" : ""
            }`}
            onClick={() => {
              moveLink(index, "down");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
        <div className="edit-links__buttons">
          <button
            className={`btn-icon btn-icon--light btn-icon--flipped ${
              linkData.visible ? "btn-icon--strike" : ""
            }`}
            onClick={() => {
              changeLink(linkData.id, "visible", !linkData.visible);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <button
            className="btn-icon btn-icon--light"
            onClick={() => {
              removeLink(linkData.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default function LinksEdit() {
  const quickLinks = useQuickLinks((state) => state.quickLinks);
  const setQuickLinks = useQuickLinks((state) => state.setQuickLinks);
  const updateQuickLinks = useQuickLinks((state) => state.updateQuickLinks);
  const moveQuickLinks = useQuickLinks((state) => state.moveQuickLinks);
  const [added, setAdded] = useState(false);
  const linkref = useRef(null);

  const changeLink = (id, name, value) => {
    updateQuickLinks(id, { [name]: value });
  };

  const addNewLink = () => {
    if (quickLinks.length > 9) return false;
    const newTodos = [
      ...quickLinks,
      {
        id: (Math.random() + 1).toString(36).substring(10),
        title: "",
        url: "",
        self: false,
        visible: true,
      },
    ];
    setQuickLinks(newTodos);
    setAdded(true);
  };

  const removeLink = (id) => {
    setQuickLinks(quickLinks.filter((t) => t.id !== id));
  };

  const moveLink = (index, dir) => {
    moveQuickLinks(index, dir);
  };
  useEffect(() => {
    linkref.current.scrollTo({
      top: linkref.current.scrollHeight,
      behavior: "smooth",
    });
    setAdded(false);
    return () => {};
  }, [added]);
  return (
    <>
      <div className="quick-links-add has-scroll" ref={linkref}>
        {quickLinks.map((item, index) => {
          return (
            <div className="quick-links-add__item" key={item.id}>
              <EditLinkCard
                linkData={item}
                index={index}
                size={quickLinks.length}
                removeLink={removeLink}
                changeLink={changeLink}
                moveLink={moveLink}
              />
            </div>
          );
        })}
      </div>

      <div className="quick-links-new">
        <button
          className={`btn btn-quick-link ${
            quickLinks.length > 9 ? "btn-quick-link--disabled" : ""
          }`}
          onClick={addNewLink}
        >
          Add new Link
        </button>
      </div>
    </>
  );
}
