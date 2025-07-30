import numpy as np
import pandas as pd
import plotly.graph_objects as go
from sklearn.cluster import DBSCAN

# Set random seed for reproducibility
np.random.seed(42)

# Generate synthetic data for different cluster shapes with more separation
# Cluster 1: Circular (center at [2, 3], 50 points)
cluster1 = np.random.multivariate_normal([2, 3], [[0.8, 0], [0, 0.8]], 50)

# Cluster 2: Elongated (center at [8, 6], 40 points)  
cluster2 = np.random.multivariate_normal([8, 6], [[1.5, 0.3], [0.3, 0.5]], 40)

# Cluster 3: Irregular (center at [5, 9], 35 points)
cluster3_part1 = np.random.multivariate_normal([5, 9], [[0.6, 0.2], [0.2, 0.6]], 15)
cluster3_part2 = np.random.multivariate_normal([4.2, 8.2], [[0.5, -0.1], [-0.1, 0.5]], 10)
cluster3_part3 = np.random.multivariate_normal([5.8, 9.8], [[0.4, 0.3], [0.3, 0.4]], 10)
cluster3 = np.vstack([cluster3_part1, cluster3_part2, cluster3_part3])

# Add noise points scattered throughout
noise = np.random.uniform(-1, 12, (15, 2))

# Combine all data
X = np.vstack([cluster1, cluster2, cluster3, noise])

# Apply DBSCAN clustering with given parameters
dbscan = DBSCAN(eps=0.3, min_samples=10)
cluster_labels = dbscan.fit_predict(X)

# Identify core samples
core_samples_mask = np.zeros_like(cluster_labels, dtype=bool)
core_samples_mask[dbscan.core_sample_indices_] = True

# Create DataFrame for analysis
df = pd.DataFrame(X, columns=['x', 'y'])
df['cluster'] = cluster_labels
df['is_core'] = core_samples_mask

# Determine point types
df['point_type'] = 'Noise'
df.loc[(df['cluster'] != -1) & (df['is_core']), 'point_type'] = 'Core'
df.loc[(df['cluster'] != -1) & (~df['is_core']), 'point_type'] = 'Border'

# Define colors using the brand colors
core_colors = ['#DB4545', '#1FB8CD', '#2E8B57']  # Red, Cyan, Green
border_colors = ['#FFB6C1', '#B0E0E6', '#98FB98']  # Light versions

# Create the figure
fig = go.Figure()

# Plot each cluster
unique_clusters = sorted(df[df['cluster'] != -1]['cluster'].unique())

for i, cluster_id in enumerate(unique_clusters):
    cluster_data = df[df['cluster'] == cluster_id]
    
    # Core points
    core_data = cluster_data[cluster_data['point_type'] == 'Core']
    if len(core_data) > 0:
        fig.add_trace(go.Scatter(
            x=core_data['x'],
            y=core_data['y'],
            mode='markers',
            marker=dict(
                color=core_colors[i % len(core_colors)], 
                size=10,
                line=dict(width=1, color='white')
            ),
            name=f'C{cluster_id+1} Core',
            cliponaxis=False,
            hovertemplate='X: %{x:.2f}<br>Y: %{y:.2f}<br>Type: Core<extra></extra>'
        ))
    
    # Border points
    border_data = cluster_data[cluster_data['point_type'] == 'Border']
    if len(border_data) > 0:
        fig.add_trace(go.Scatter(
            x=border_data['x'],
            y=border_data['y'],
            mode='markers',
            marker=dict(
                color=border_colors[i % len(border_colors)], 
                size=8,
                line=dict(width=1, color=core_colors[i % len(core_colors)])
            ),
            name=f'C{cluster_id+1} Border',
            cliponaxis=False,
            hovertemplate='X: %{x:.2f}<br>Y: %{y:.2f}<br>Type: Border<extra></extra>'
        ))

# Plot noise points
noise_data = df[df['cluster'] == -1]
if len(noise_data) > 0:
    fig.add_trace(go.Scatter(
        x=noise_data['x'],
        y=noise_data['y'],
        mode='markers',
        marker=dict(color='black', size=6),
        name='Noise',
        cliponaxis=False,
        hovertemplate='X: %{x:.2f}<br>Y: %{y:.2f}<br>Type: Noise<extra></extra>'
    ))

# Update layout with proper title
fig.update_layout(
    title='DBSCAN Clustering Results: Core, Border, and Noise Points<br><sub>Parameters: eps=0.3, min_samples=10</sub>',
    xaxis_title='X Coordinate',
    yaxis_title='Y Coordinate'
)

# Save the chart
fig.write_image('dbscan_clustering.png')