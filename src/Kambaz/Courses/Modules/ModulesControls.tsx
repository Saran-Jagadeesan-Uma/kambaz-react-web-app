import { useState } from "react";
import { FaPlus, FaEye, FaChevronUp } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import RedXMark from "./RedXmark";
import ModuleEditor from "./ModuleEditor";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <Dropdown.Toggle
          style={{
            backgroundColor: "#ccc",
            color: "black",
            borderColor: "#ccc",
          }}
          size="lg"
          id="wd-publish-all-btn"
        >
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <RedXMark />
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <RedXMark />
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button
        style={{ backgroundColor: "#ccc", color: "black", borderColor: "#ccc" }}
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        <FaEye className="position-relative me-2" style={{ bottom: "1px" }} />
        View Progress
      </Button>

      <Button
        style={{ backgroundColor: "#ccc", color: "black", borderColor: "#ccc" }}
        size="lg"
        className="me-1 float-end"
        id="wd-collapse-all"
      >
        <FaChevronUp
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Collapse All
      </Button>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
