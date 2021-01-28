<template>
  <div class="bee-angle">
    <div class="bee-angle__round" ref="angleRef" :style="getStyle"></div>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch, onMounted, defineComponent } from "vue";
import { calcAngle, triggerDragEvent, DragEventOption } from "../utils";

const angleProps = {
  angle: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 16,
    validator: (value: number) => {
      return value >= 16;
    }
  },
  borderWidth: {
    type: Number,
    default: 1,
    validator: (value: number) => {
      return value >= 1;
    }
  },
  borderColor: {
    type: String,
    default: "#666"
  }
};

const AngleComponent = defineComponent({
  name: "angle",
  props: angleProps,
  emits: ["update:angle", "change"],
  setup(props, { emit }) {
    const angleRef = ref<HTMLElement | null>(null);

    const rotate = ref(0);

    watch(
      () => props.angle,
      (angle: number) => {
        rotate.value = angle;
      }
    );

    const updateAngle = (): void => {
      let value = Number(rotate.value);
      if (!isNaN(value)) {
        value = value > 360 || value < 0 ? props.angle : value;
        rotate.value = value === 360 ? 0 : value;
        emit("update:angle", rotate.value);
        emit("change", rotate.value);
      }
    };

    const getStyle = computed(() => {
      return {
        width: props.size + "px",
        height: props.size + "px",
        borderWidth: props.borderWidth + "px",
        borderColor: props.borderColor,
        transform: `rotate(${rotate.value}deg)`
      };
    });

    const handleDrag = (event: MouseEvent) => {
      if (angleRef.value) {
        rotate.value = calcAngle(angleRef.value, event) % 360;
        updateAngle();
      }
    };

    onMounted(() => {
      const dragConfig: DragEventOption = {
        drag: (event: Event) => {
          handleDrag(event as MouseEvent);
        },
        end: (event: Event) => {
          handleDrag(event as MouseEvent);
        }
      };

      if (angleRef.value) {
        triggerDragEvent(angleRef.value, dragConfig);
      }
    });

    return { angleRef, getStyle, handleDrag };
  }
});

export default AngleComponent;
</script>

<style lang="scss" scoped>
.bee-angle {
  transform: rotate(90deg);

  > * {
    display: inline-block;
    vertical-align: middle;
  }

  &.zero-right {
    transform: rotate(180deg);
  }

  &.zero-bottom {
    transform: rotate(270deg);
  }

  &__round {
    position: relative;
    margin-left: 8px;
    width: 16px;
    height: 16px;
    border: 1px solid #666;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;

    &:before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 50%;
      height: 1px;
      background-color: #666;
    }
  }
}
</style>
