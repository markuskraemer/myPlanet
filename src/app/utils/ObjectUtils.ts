

export class ObjectUtils {
    public static deepCopy(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = ObjectUtils.deepCopy(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = ObjectUtils.deepCopy(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }
}

export function nonenumerable(target: any, key: string) {
  // first property defined in prototype, that's why we use getters/setters
  // (otherwise assignment in object will override property in prototype)
  Object.defineProperty(target, key, {
    get: function() {
      return undefined;
    },
    set: function(this: any, val) {
      // here we have reference to instance and can set property directly to it
      Object.defineProperty(this, key, {
        value: val,
        writable: true,
        enumerable: false,
      });
    },

    enumerable: false,
  });
}
