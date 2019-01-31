import sqlite3

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cbook as cbook

conn = sqlite3.connect('../bwf.db')
c = conn.cursor()

c.execute('select * from player')
wl = [row for row in c.fetchall()]
wins = [r[3] for r in wl]
loses = [r[4] for r in wl]
names = [r[0] for r in wl]


fig, ax = plt.subplots()
ax.scatter(loses, wins)

for i, name in enumerate(names):
    ax.annotate(name, (loses[i], wins[i]))

ax.set_xlabel(r'loses', fontsize=15)
ax.set_ylabel(r'wins', fontsize=15)
ax.set_title('wins vs loses')

ax.grid(True)
fig.tight_layout()

plt.show()