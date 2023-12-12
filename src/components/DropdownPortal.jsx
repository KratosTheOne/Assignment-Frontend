import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const DropdownPortal = ({ children }) => {
  const dropdownPortalRoot = document.getElementById("dropdown-portal-root");

  if (!dropdownPortalRoot) return null;

  return createPortal(children, dropdownPortalRoot);
};

DropdownPortal.propTypes = {
  children: PropTypes.node.isRequired, // Prop validation for children
};

export default DropdownPortal;
