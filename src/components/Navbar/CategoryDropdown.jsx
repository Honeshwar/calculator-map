import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { useRouter } from "next/navigation";

const CategoryDropdown = ({ toggleDropDown }) => {
  //   const [category, setCategory] = useState('')
  const router = useRouter();

  //   useEffect(() => {
  //       console.log(category)
  //     }, [category])

  const handleClick = (category) => {
    console.log(category, "here");
    // setCategory(category)
    router.push(`/articles?category=${category}`);
    toggleDropDown();
  };

  return (
    <div>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("politics")}
      >
        Politics
      </span>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("economy")}
      >
        Economy
      </span>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("sports")}
      >
        Sports
      </span>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("entertainment")}
      >
        Lifestyle & Entertainment
      </span>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("didyouknow")}
      >
        Did you know !
      </span>
      <span
        className={styles.dropDownItem}
        onClick={() => handleClick("governance")}
      >
        Governance
      </span>
    </div>
  );
};

export default CategoryDropdown;
