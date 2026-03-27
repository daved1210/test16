export class Physics {
  static canPlaceBlock(world, player, x, y, z) {
    const testPosition = player.getFeetPosition();
    const minX = testPosition.x - 0.3;
    const maxX = testPosition.x + 0.3;
    const minY = testPosition.y;
    const maxY = testPosition.y + 1.8;
    const minZ = testPosition.z - 0.3;
    const maxZ = testPosition.z + 0.3;

    const blockMinX = x;
    const blockMaxX = x + 1;
    const blockMinY = y;
    const blockMaxY = y + 1;
    const blockMinZ = z;
    const blockMaxZ = z + 1;

    const overlaps = !(
      maxX <= blockMinX ||
      minX >= blockMaxX ||
      maxY <= blockMinY ||
      minY >= blockMaxY ||
      maxZ <= blockMinZ ||
      minZ >= blockMaxZ
    );

    return !overlaps && !world.isSolidAt(x, y, z);
  }
}
