import React, { useState, useCallback, useRef } from "react";
import { PhotoAlbum } from "react-photo-album";
import clsx from "clsx";
import img1 from "/public/img1.jpg";
import img2 from "/public/img2.jpg";
import img3 from "/public/img3.jpg";
import img4 from "/public/img4.jpg";
import img5 from "/public/img5.jpg";
import img6 from "/public/img6.jpg";
import img7 from "/public/img7.jpg";
import img8 from "/public/img8.jpg";
import img9 from "/public/img9.jpg";
import img10 from "/public/img10.jpg";
import img11 from "/public/img11.jpg";
import img12 from "/public/img12.jpg";
import img13 from "/public/img13.jpg";
import img14 from "/public/img14.jpg";
import img15 from "/public/img15.jpg";
import img16 from "/public/img16.jpg";
import img17 from "/public/img17.jpg";
import img18 from "/public/img18.jpg";
import img19 from "/public/img19.jpg";
import img20 from "/public/img20.jpg";
import img21 from "/public/img21.jpg";
import img22 from "/public/img22.jpg";
import img23 from "/public/img23.jpg";
import img24 from "/public/img24.jpg";
import img25 from "/public/img25.jpg";
import img26 from "/public/img26.jpg";
import img27 from "/public/img27.jpg";
import img28 from "/public/img28.jpg";
import img29 from "/public/img29.jpg";
import img30 from "/public/img30.jpg";
import img31 from "/public/img31.jpg";
import img32 from "/public/img32.jpg";
import img33 from "/public/img33.jpg";
import img34 from "/public/img34.jpg";
import img35 from "/public/img35.jpg";
import img36 from "/public/img36.jpg";
import img37 from "/public/img37.jpg";
import img38 from "/public/img38.jpg";
import img39 from "/public/img39.jpg";
import img40 from "/public/img40.jpg";



import {
  closestCenter,
  DndContext,
  //   DragEndEvent,
  DragOverlay,
  //   DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import "./Gallery.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

const unsplashPhotos = [
  { src: img1, width: 1080, height: 1080},
  { src: img2, width: 1080, height: 1080},
  { src: img3, width: 1080, height: 1080},
  { src: img4, width: 1080, height: 1080},
  { src: img5, width: 1080, height: 1080},
  { src: img6, width: 1080, height: 1080},
  { src: img7, width: 1080, height: 1080},
  { src: img8, width: 1080, height: 1080},
  { src: img9, width: 1080, height: 1080},
  { src: img10, width: 1080, height: 1080},
  { src: img11, width: 1080, height: 1080},
  { src: img12, width: 1080, height: 1080},
  { src: img13, width: 1080, height: 1080},
  { src: img14, width: 1080, height: 1080},
  { src: img15, width: 1080, height: 1080},
  { src: img16, width: 1080, height: 1080},
  { src: img17, width: 1080, height: 1080},
  { src: img18, width: 1080, height: 1080},
  { src: img19, width: 1080, height: 1080},
  { src: img20, width: 1080, height: 1080},
  { src: img21, width: 1080, height: 1080},
  { src: img22, width: 1080, height: 1080},
  { src: img23, width: 1080, height: 1080},
  { src: img24, width: 1080, height: 1080},
  { src: img25, width: 1080, height: 1080},
  { src: img26, width: 1080, height: 1080},
  { src: img27, width: 1080, height: 1080},
  { src: img28, width: 1080, height: 1080},
  { src: img29, width: 1080, height: 1080},
  { src: img30, width: 1080, height: 1080},
  { src: img31, width: 1080, height: 1080},
  { src: img32, width: 1080, height: 1080},
  { src: img33, width: 1080, height: 1080},
  { src: img34, width: 1080, height: 1080},
  { src: img35, width: 1080, height: 1080},
  { src: img36, width: 1080, height: 1080},
  { src: img37, width: 1080, height: 1080},
  { src: img38, width: 1080, height: 1080},
  { src: img39, width: 1080, height: 1080},
  { src: img40, width: 1080, height: 1080},
];

const photoSet = unsplashPhotos.map((photo) => ({
  src: photo.src,
  width: photo.width,
  height: photo.height,
  srcSet: breakpoints.map((breakpoint) => {
    const height = Math.round((photo.height / photo.width) * breakpoint);
    return {
      src: photo.src,
      width: breakpoint,
      height,
    };
  }),
}));

const PhotoFrame = React.memo(
  React.forwardRef((props, ref) => {
    const {
      layoutOptions,
      imageProps,
      overlay,
      active,
      insertPosition,
      attributes,
      listeners,
    } = props;
    const { alt, style, ...restImageProps } = imageProps;
    return (
      <div
        ref={ref}
        style={{
          width: overlay
            ? `calc(100% - ${2 * layoutOptions.padding}px)`
            : style.width,
          padding: style.padding,
          marginBottom: style.marginBottom,
        }}
        className={clsx("photo-frame", {
          overlay: overlay,
          active: active,
          insertBefore: insertPosition === "before",
          insertAfter: insertPosition === "after",
        })}
        {...attributes}
        {...listeners}
      >
        <img
          alt={alt}
          style={{
            ...style,
            width: "100%",
            height: "auto",
            padding: 0,
            marginBottom: 0,
          }}
          {...restImageProps}
        />
      </div>
    );
  })
);
PhotoFrame.displayName = "PhotoFrame";

function SortablePhotoFrame(props) {
  const { photo, activeIndex } = props;
  const { attributes, listeners, isDragging, index, over, setNodeRef } =
    useSortable({ id: photo.id });

  return (
    <PhotoFrame
      ref={setNodeRef}
      active={isDragging}
      insertPosition={
        activeIndex !== undefined && over?.id === photo.id && !isDragging
          ? index > activeIndex
            ? "after"
            : "before"
          : undefined
      }
      aria-label="sortable image"
      attributes={attributes}
      listeners={listeners}
      {...props}
    />
  );
}

export default function Gallery() {
  const [photos, setPhotos] = useState(
    photoSet.map((photo) => ({
      ...photo,
      id: photo.src,
    }))
  );
  const renderedPhotos = useRef({});
  const [activeId, setActiveId] = useState(null);
  const activeIndex = activeId
    ? photos.findIndex((photo) => photo.id === activeId)
    : undefined;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 50, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = useCallback(
    ({ active }) => setActiveId(active.id),
    []
  );

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, []);

  const renderPhoto = useCallback(
    (props) => {
      // capture rendered photos for future use in DragOverlay
      renderedPhotos.current[props.photo.id] = props;
      return <SortablePhotoFrame activeIndex={activeIndex} {...props} />;
    },
    [activeIndex]
  );
  const [index, setIndex] = useState(-1);
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos}>
        <div
          style={{
            padding: 40,
            paddingLeft: 80,
            paddingRight: 80,
            paddingBottom: 80,
          }}
        >
          <PhotoAlbum
            photos={photos}
            layout="rows"
            spacing={30}
            padding={3}
            renderPhoto={renderPhoto}
            onClick={({ index }) => setIndex(index)}
          />
          <Lightbox
            slides={photos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
          />
        </div>
      </SortableContext>
      <DragOverlay>
        {activeId && (
          <PhotoFrame overlay {...renderedPhotos.current[activeId]} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
